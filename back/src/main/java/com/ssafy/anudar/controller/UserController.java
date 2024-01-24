package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.UserDto;
import com.ssafy.anudar.dto.request.JoinRequest;
import com.ssafy.anudar.dto.request.LoginRequest;
import com.ssafy.anudar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.ssafy.anudar.S3.FileFolder;
import com.ssafy.anudar.S3.S3Service;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

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

    @GetMapping("/info")
    public ResponseEntity<UserDto> info(Authentication authentication) {
        return new ResponseEntity<>(userService.getUser(authentication.getName()),HttpStatus.OK);
    }

    // 회원 정보 수정
    @PatchMapping("/patch")
    // 인증 토큰을 받고, JoinRequest으로 수정 데이터를 받음
    public ResponseEntity<UserDto> patch(Authentication authentication, @RequestBody JoinRequest req) {

        return new ResponseEntity<>(userService.patch(authentication.getName(), req),HttpStatus.OK);
    }

    // 회원 탈퇴 : 토큰으로 대체해 볼 예정
    @DeleteMapping("/signout")
    public String signout(@PathVariable String userId){
        return "안녕히 가십시오.";
    }

}
