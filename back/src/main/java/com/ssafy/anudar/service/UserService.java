package com.ssafy.anudar.service;

import com.ssafy.anudar.config.JwtUtil;
import com.ssafy.anudar.dto.*;
import com.ssafy.anudar.dto.request.JoinRequest;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.UnAuthorizedException;
import com.ssafy.anudar.exception.response.ExceptionStatus;

import com.ssafy.anudar.model.*;
import com.ssafy.anudar.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
    private final AuctionWorkRepository auctionWorkRepository;
    private final LikeExhibitionRepository likeExhibitionRepository;
    private final LikeWorkRepository likeWorkRepository;
    private final UserCacheRepository userCacheRepository;

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
        return userCacheRepository.getUser(username).orElseGet(() ->
                userRepository.findByUsername(username).map(UserPrincipalDetails::fromEntity)
                        .orElseThrow(()-> new UnAuthorizedException(ExceptionStatus.UNAUTHORIZED)));
    }

    public String login(String username, String password) {
        // 회원가입 여부 체크
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        if(!bCryptPasswordEncoder.matches(password, user.getPassword())) {
            throw new BadRequestException(ExceptionStatus.PASSWORD_MISMATCH);
        }
        // save in redis
        userCacheRepository.setUser(UserPrincipalDetails.fromEntity(user));
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
        // username과 name은 수정은 X
        user.setNickname(req.getNickname());
        user.setEmail(req.getEmail());
        user.setImage(req.getImage());
        user.setPhone(req.getPhone());
        // 수정된 사용자 정보를 저장
        return UserDto.fromEntity(userRepository.save(user));

    }

    // 비밀번호 수정
    public UserDto updatepassword(String username, String oldpassword, String newpassword, String checkpassword) {
        // 로그인 로직
        // 회원가입 여부 체크
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        // 기본 비밀번호와 동일한지 체크
        if(bCryptPasswordEncoder.matches(oldpassword, user.getPassword()) && newpassword.equals(checkpassword)) {
            // 새로운 비밀번호와 비밀번호 확인이 동일한지 체크
            user.setPassword(bCryptPasswordEncoder.encode(newpassword));
            userRepository.save(user);

        } else {
            throw new BadRequestException(ExceptionStatus.PASSWORD_MISMATCH);
        }

        return UserDto.fromEntity(user);
    }

    // 회원 탈퇴 : 연관된 테이블 설정 필요
    public void signout(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        userRepository.deleteById(user.getId());
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

    // 나의 결제 내역
    public List<AuctionWorkDto> getpay(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        return auctionWorkRepository.findByUser(user).stream().map(AuctionWorkDto::fromEntity).collect(Collectors.toList());
    }
    // 팔로우
    public FollowDto follow(String toUsername, String fromUsername) {
        // 자신을 팔로우할 경우 예외 처리
        if (toUsername.equals(fromUsername))
            throw new BadRequestException(ExceptionStatus.FOLLOW_SELF);
        // 팔로우 대상 및 본인 존재 여부
        User toUser = userRepository.findByUsername(fromUsername)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        User fromUser = userRepository.findByUsername(toUsername)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        // 이미 팔로우 할 경우 예외 처리
        if(followRepository.findByToUserAndFromUser(toUser, fromUser)!=null)
            throw new BadRequestException(ExceptionStatus.DUPLICATE_FOLLOW);

        // 알림 생성 및 보내기
//        eventNotifyService.notifyFollow(toUser, fromUser);

        // 알림 생성 및 보내기
        String notifyContent = fromUser.getName() + "님이 당신을 팔로우했습니다.";
        Notify notify = new Notify(toUser,FOLLOW, notifyContent, false);
        notifyRepository.save(notify);

        // 알림을 유저 엔터티의 알림 리스트에 추가
        toUser.getNotifies().add(notify);

        //팔로우 저장
        return FollowDto.fromEntity(followRepository.save(new Follow(toUser, fromUser)));

    }

    // 언팔로우
    public void unfollow(String toUsername, String fromUsername) {
        // 팔로우 대상 및 본인 존재 여부
        User toUser = userRepository.findByUsername(fromUsername)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        User fromUser = userRepository.findByUsername(toUsername)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        followRepository.deleteByToUserAndFromUser(toUser,fromUser);
    }

    // 팔로잉 목록
    public List<UserDto> following(String username) {
        // 본인 존재 여부 확인
        User fromUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        List<Follow> follows = followRepository.findAllByFromUser(fromUser);
        return follows.stream()
                .map(follow -> UserDto.fromEntity(follow.getToUser()))
                .collect(Collectors.toList());
    }

    // 팔로워 목록
    public List<UserDto> follower(String username) {
        // 본인 존재 여부 확인
        User toUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        List<Follow> follows = followRepository.findAllByToUser(toUser);
        return follows.stream()
                .map(follow -> UserDto.fromEntity(follow.getFromUser()))
                .collect(Collectors.toList());
    }

    // 찜한 전시 목록
    public List<ExhibitionDto> likeExhibit(String username) {
        // 본인 확인
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        List<LikeExhibition> likes = likeExhibitionRepository.findAllByUser(user);
        return likes.stream()
                .map(likeExhibition -> ExhibitionDto.fromEntity(likeExhibition.getExhibition()))
                .collect(Collectors.toList());
    }

    // 찜한 작품 목록
    public List<WorkDto> likeWork(String username) {
        // 본인 확인
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        List<LikeWork> likes = likeWorkRepository.findAllByUser(user);
        return likes.stream()
                .map(likeWork -> WorkDto.fromEntity(likeWork.getWork()))
                .collect(Collectors.toList());
    }

    // 낙찰 작품 목록
    public List<WorkDto> bidWork(String username) {
        // 본인 확인
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        List<AuctionWork> bids = auctionWorkRepository.findAllByUser(user);
        return bids.stream()
                .map(auctionWork -> WorkDto.fromEntity(auctionWork.getWork()))
                .collect(Collectors.toList());
    }

    // username 중복 체크
    public void usernameCheck(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()) throw new BadRequestException(ExceptionStatus.DUPLICATE_USERNAME);
    }

    // nickname 중복 체크
    public void nicknameCheck(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);
        if(user.isPresent()) throw new BadRequestException(ExceptionStatus.DUPLICATE_NICKNAME);
    }

}

