package com.ssafy.anudar.service;

import com.ssafy.anudar.config.JwtUtil;
import com.ssafy.anudar.dto.UserDto;
import com.ssafy.anudar.dto.request.JoinRequest;
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

import java.util.List;
import java.util.stream.Collectors;

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
    // 회원 정보 수정 : 들어왔다면, 값을 변경해주는 것으로
    public UserDto patch(String username, JoinRequest req) {
        System.out.println(username);
        System.out.println(req.getPhone());
        // join 하려는 username 으로 회원가입된 user가 있는지 체크
        // 수정하려는 username으로 데이터 끌어오기 => 애초에  aythentication이 있어야 접근 가능하기 때문에 username 존재
        // username으로 데이터를 불러와서 값을 변경하기
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        // username 수정은 하면 안될 것 같아서 일단 안 만들었습니다 => 막을 방법 찾기
        // 비밀번호는 어떻게 할까..?
        if (req.getName() != null){
            user.setName(req.getName());
        }
        if (req.getNickname() != null){
            user.setNickname(req.getNickname());
        }
        if (req.getEmail() != null){
            user.setEmail(req.getEmail());
        }
        if (req.getImage() != null){
            user.setImage(req.getImage());
        }
        if (req.getPhone() != null){
            user.setPhone(req.getPhone());
        }

        // 수정된 사용자 정보를 저장
        userRepository.save(user);
        return null;
    }

    public void delete() {
        System.out.println("으악");
    }

    public List<UserDto> getUserAll() {
        System.out.println("전체 사용자 조회");
        List<User> userList = (List<User>) userRepository.findAll();
//        for (int i = 0; i<userList.size();i++){
//            System.out.println(userList.get(i));
//        }
        System.out.println(userList);
        System.out.println(userList.stream().map(UserDto::fromEntity).collect(Collectors.toList()));
        return userList.stream().map(UserDto::fromEntity).collect(Collectors.toList());
    }
}
