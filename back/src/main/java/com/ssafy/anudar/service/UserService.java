package com.ssafy.anudar.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.ssafy.anudar.config.JwtUtil;
import com.ssafy.anudar.dto.FollowDto;
import com.ssafy.anudar.dto.UserDto;
import com.ssafy.anudar.dto.request.JoinRequest;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.UnAuthorizedException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.*;
import com.ssafy.anudar.repository.FollowRepository;
import com.ssafy.anudar.repository.NotifyRepository;
import com.ssafy.anudar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.anudar.model.Notify.NotifyType.FOLLOW;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 알림 보내기위해서 추가
    private final EventNotifyService eventNotifyService;
    private final NotifyRepository notifyRepository;

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
    public UserDto update(String username, JoinRequest req) {

        // username으로 데이터를 불러와서 값을 변경하기
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        // username과 name은 수정은 X / 비밀번호 수정 따로 추가 예정
        // null 값 들어오면 null로 수정해주기 필요
        user.setNickname(req.getNickname());
        user.setEmail(req.getEmail());
        user.setImage(req.getImage());
        // 수정된 사용자 정보를 저장
        return UserDto.fromEntity(userRepository.save(user));

    }

    // 회원 탈퇴 : enable 변경
    public UserDto signout(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        // false로 변경된 회원의 정보 저장
        return UserDto.fromEntity(userRepository.save(user));
    }

    // 전체 작가 조회 : 탈퇴하지 않은 사람 중에 작가인 경우 조회 => 다른 테이블과 조인 필요
    public List<UserDto> getAuthorAll() {
        return userRepository.findByRole(UserRole.AUTHOR).stream().map(UserDto::fromEntity).collect(Collectors.toList());
    }

    // 작가 상세 조회
    public UserDto getAuthor(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        return UserDto.fromEntity(user);
    }

    // 팔로우
    public FollowDto follow(String toUsername, String fromUsername) {
        // 팔로우 대상 및 본인
        User toUser = userRepository.findByUsername(fromUsername)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        User fromUser = userRepository.findByUsername(toUsername)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        // 팔로우 저장
        Follow follow = followRepository.save(new Follow(toUser, fromUser));

        // 알림 생성 및 보내기
//        eventNotifyService.notifyFollow(toUser, fromUser);

        // 알림 생성 및 보내기
        String notifyContent = fromUser.getName() + "님이 당신을 팔로우했습니다.";
        Notify notify = new Notify(toUser,FOLLOW, notifyContent, false);
        notifyRepository.save(notify);
//
//        // 알림을 유저 엔터티의 알림 리스트에 추가
        toUser.getNotifies().add(notify);

        return FollowDto.fromEntity(follow);
    }

    // 언팔로우
    public void unfollow(String toUsername, String fromUsername) {
        // 팔로우 대상 및 본인
        User toUser = userRepository.findByUsername(fromUsername)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        User fromUser = userRepository.findByUsername(toUsername)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        followRepository.deleteByToUserAndFromUser(toUser,fromUser);
    }


    // 알림 삭제
    @Transactional
    public void deleteNotification(String username, Long notificationId) {
        // 알림 조회
        Optional<Notify> notifyOptional = notifyRepository.findById(notificationId);

        // 알림이 존재하지 않을 경우 예외 처리
        if (notifyOptional.isEmpty()) {
            throw new BadRequestException(ExceptionStatus.NOTIFICATION_NOT_FOUND);
        }

        Notify notify = notifyOptional.get();

        // 알림 소유자가 요청한 사용자와 일치하지 않을 경우 예외 처리
        if (!notify.getReceiver().getUsername().equals(username)) {
            throw new UnAuthorizedException(ExceptionStatus.UNAUTHORIZED);
        }

        // 사용자의 알림 리스트에서도 해당 알림 삭제
        User user = notify.getReceiver();
        user.getNotifies().remove(notify);

        // 알림 삭제
        notifyRepository.delete(notify);
    }

}

