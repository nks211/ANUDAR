package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.*;
import com.ssafy.anudar.dto.request.*;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.ssafy.anudar.S3.FileFolder;
import com.ssafy.anudar.S3.S3Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@CrossOrigin(allowedHeaders = "*", originPatterns = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

//    private final NotifyService notifyService;
    private final UserService userService;
    private final S3Service s3Service;

    @PostMapping("/img")
    public ResponseEntity<String> img(@RequestParam(value="image")MultipartFile image) {
        return new ResponseEntity<>(s3Service.uploadFile(image, FileFolder.USER_IMG), HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<UserDto> join(@RequestBody JoinRequest req) {
        UserDto userDto = userService.join(req.getUsername(), req.getPassword(), req.getName(), req.getNickname(), req.getEmail(), req.getImage(), req.getPhone());
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest req) {
        return new ResponseEntity<>(userService.login(req.getUsername(),req.getPassword()), HttpStatus.OK);
    }

    @PostMapping("/username")
    public ResponseEntity<String> checkUsername(@RequestBody String username) {
        userService.usernameCheck(username);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @PostMapping("/nickname")
    public ResponseEntity<String> checkNickname(@RequestBody String nickname) {
        userService.nicknameCheck(nickname);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<UserDto> info(Authentication authentication) {
        return new ResponseEntity<>(userService.getUser(authentication.getName()),HttpStatus.OK);
    }

    // 회원 정보 수정
    @PutMapping("/update")
    // 인증 토큰을 받고, JoinRequest으로 수정 데이터를 받음
    public ResponseEntity<UserDto> update(Authentication authentication, @RequestBody JoinRequest req) {
        return new ResponseEntity<>(userService.update(authentication.getName(), req),HttpStatus.OK);
    }

    // 비밀번호 변경
    @PutMapping("/update/password")
    public ResponseEntity<UserDto> updatepassword(Authentication authentication, @RequestBody UpdatePasswordRequest req) {
        return new ResponseEntity<>(userService.updatepassword(authentication.getName(), req.getOldpassword(), req.getNewpassword(), req.getCheckpassword()) ,HttpStatus.OK);
    }

    // 회원 탈퇴 : 토큰으로 대체해 볼 예정
    @DeleteMapping("/signout")
    public ResponseEntity<String> signout(Authentication authentication){
        userService.signout(authentication.getName());
        return new ResponseEntity<>("안녕히 가세요.", HttpStatus.OK);
    }

    // 전체 작가 조회
    @GetMapping("/authors")
    public ResponseEntity<List<UserDto>> infoAuthorsAll() {

        return new ResponseEntity<>(userService.getAuthorAll(), HttpStatus.OK);
    }

    // 작가 상세 조회
    @GetMapping("/info/author/{username}")
    public ResponseEntity<UserDto> getAuthor(@PathVariable("username") String username) {
        return new ResponseEntity<>(userService.getAuthor(username),HttpStatus.OK);
    }


    // 나의 결제 내역
    @GetMapping("/pay/work")
    public ResponseEntity<List<SuccessWorkDto>> mypay(Authentication authentication) {
        return new ResponseEntity<>(userService.getpay(authentication.getName()), HttpStatus.OK);
    }

    // 작가 팔로우
    @PostMapping("/follow/{username}")
    public ResponseEntity<FollowDto> follow(Authentication authentication, @PathVariable("username") String username) {
        FollowDto followDto = userService.follow(authentication.getName(), username);
        return new ResponseEntity<>(followDto, HttpStatus.OK);
    }

    // 작가 언팔로우
    @DeleteMapping("/unfollow/{username}")
    public void unfollow(Authentication authentication, @PathVariable("username") String username) {
        userService.unfollow(authentication.getName(), username);
    }

    // 알림 조회
    @GetMapping("/{username}/notifies")
    public ResponseEntity<List<NotifyDto>> getNotifies(Authentication authentication) {
        List<NotifyDto> notifies = userService.getNotifiesByUsername(authentication.getName());
        return ResponseEntity.ok(notifies);
    }

    // 알림 읽음 처리
    @PutMapping("/notifies/{notifyId}/read")
    public ResponseEntity<NotifyDto> markAsRead(Authentication authentication, @PathVariable Long notifyId) {
        NotifyDto notifyDto = userService.markAsRead(authentication, notifyId);
        return ResponseEntity.ok(notifyDto);
    }

    // 알림 삭제
    @DeleteMapping("/notifies/{notifyId}")
    public ResponseEntity<String> deleteNotify(Authentication authentication, @PathVariable Long notifyId) {
        userService.deleteNotify(authentication, notifyId);
        return new ResponseEntity<>("알림이 성공적으로 삭제되었습니다.", HttpStatus.OK);
    }


    // 작가 팔로잉 목록
    @GetMapping("/following")
    public ResponseEntity<List<UserDto>> following (Authentication authentication) {
        List<UserDto> followings = userService.following(authentication.getName());
        return new ResponseEntity<>(followings, HttpStatus.OK);
    }

    // 작가 팔로워 목록
    @GetMapping("/follower")
    public ResponseEntity<List<UserDto>> follower (Authentication authentication) {
        List<UserDto> followers = userService.follower(authentication.getName());
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }

    // 포인트 조회
    @GetMapping("/points")
    public ResponseEntity<Long> getUserPoints (Authentication authentication) {
        Long userPoints = userService.getUserPoints(authentication.getName());
        return new ResponseEntity<>(userPoints, HttpStatus.OK);
    }

    // 포인트 업데이트(포인트 결제 시 포인트 추가)
    @PutMapping("/updatePoints")
    public ResponseEntity<Long> updateUserPoints(Authentication authentication, @RequestBody PointsUpdateDto pointsUpdateDto) {
        // 현재 인증된 유저의 이름(또는 아이디)을 사용하여 포인트 업데이트
        Long updatedPoints = userService.updateUserPoints(authentication.getName(), pointsUpdateDto.getNewPoints());

        // 업데이트된 포인트를 ResponseEntity 객체에 담아 반환
        return new ResponseEntity<>(updatedPoints, HttpStatus.OK);
    }

    // 찜한 전시 목록
    @GetMapping("/like/exhibit")
    public ResponseEntity<List<ExhibitionDto>> likeExhibit (Authentication authentication) {
        List<ExhibitionDto> exhibitions = userService.likeExhibit(authentication.getName());
        return new ResponseEntity<>(exhibitions, HttpStatus.OK);
    }

    // 찜한 작품 목록
    @GetMapping("/like/work")
    public ResponseEntity<List<WorkDto>> likeWork (Authentication authentication) {
        List<WorkDto> works = userService.likeWork(authentication.getName());
        return new ResponseEntity<>(works, HttpStatus.OK);
    }

    // 낙찰 작품 목록
    @GetMapping("/bid/work")
    public ResponseEntity<List<WorkDto>> bidWork (Authentication authentication) {
        List<WorkDto> works = userService.bidWork(authentication.getName());
        return new ResponseEntity<>(works, HttpStatus.OK);
    }
}

