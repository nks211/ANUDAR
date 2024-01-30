package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.LikeWorkDto;
import com.ssafy.anudar.dto.UserDto;
import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.model.LikeWork;
import com.ssafy.anudar.service.WorkService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/work")
public class WorkController {
    private final WorkService workService;

    // 작품 전체 조회 : 작가 등 테이블 연결 필요
    @GetMapping
    public List<WorkDto> infos() {
        return workService.getWorksAll();
    }

    // 작품 찜하기
    @PostMapping("/like/{work_id}")
    public ResponseEntity<String> like(Authentication authentication, @PathVariable("work_id") Long work_id) {
        return new ResponseEntity<>(workService.likeWork(authentication.getName(), work_id), HttpStatus.OK);
    }

    // 작품 찜하기 취소
    @PostMapping("/unlike/{work_id}")
    public ResponseEntity<String> unlike(Authentication authentication, @PathVariable("work_id") Long work_id) {
        return new ResponseEntity<>(workService.unlikeWork(authentication.getName(), work_id), HttpStatus.OK);
    }

    // 작품 찜 수 조회
    @GetMapping("/like/count/{work_id}")
    public ResponseEntity<Long> likecount(@PathVariable("work_id") Long work_id) {
        return new ResponseEntity<>(workService.likeCount(work_id), HttpStatus.OK);
    }
}
