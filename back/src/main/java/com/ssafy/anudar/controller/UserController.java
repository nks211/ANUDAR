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

}
