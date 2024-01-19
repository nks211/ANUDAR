package com.ssafy.anudar.service;

import com.ssafy.anudar.config.JwtUtil;
import com.ssafy.anudar.dto.UserDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.UnAuthorizedException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.UserPrincipalDetails;
import com.ssafy.anudar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${jwt.secret}")
    private String key;

    @Value("${jwt.access-token.expiretime}")
    private Long expiredTimeMs;

    @Transactional
    public UserDto join(String username, String password, String name, String nickname, String email, String image, String phone) {
        // join 하려는 username 으로 회원가입된 user 가 있는지 체크
        userRepository.findByUsername(username)
                .ifPresent(it -> {
                    throw new BadRequestException(ExceptionStatus.DUPLICATE_USERNAME);
                });
        return UserDto.fromEntity(userRepository.save(new User(username, bCryptPasswordEncoder.encode(password), name, nickname, email, image, phone)));
    }

    public UserPrincipalDetails loadUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(UserPrincipalDetails::fromEntity)
                .orElseThrow(()-> new UnAuthorizedException(ExceptionStatus.UNAUTHORIZED));
    }

    public String login(String username, String password) {
        // 회원가입 여부 체크
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        if(!bCryptPasswordEncoder.matches(password, user.getPassword())) {
            throw new BadRequestException(ExceptionStatus.PASSWORD_MISMATCH);
        }

        return JwtUtil.generateToken(username, key, expiredTimeMs);
    }

    public UserDto getUser(String username) {
        return userRepository.findByUsername(username)
                .map(UserDto::fromEntity)
                .orElseThrow(()-> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
    }
}
