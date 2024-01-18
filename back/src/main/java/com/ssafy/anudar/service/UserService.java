package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.UserDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public UserDto join(String username, String password, String name, String nickname, String email, String image, String phone) {
        // join 하려는 username 으로 회원가입된 user 가 있는지 체크
        userRepository.findByUsername(username)
                .ifPresent(it -> {
                    throw new BadRequestException(ExceptionStatus.DUPLICATE_USERNAME);
                });
        return UserDto.fromEntity(userRepository.save(new User(username, password, name, nickname, email, image, phone)));
    }

}
