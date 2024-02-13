package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.model.Work;
import com.ssafy.anudar.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(allowedHeaders = "*", originPatterns = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/work")
public class WorkController {

    private final WorkService workService;

    // 작품 전체 조회 : 작가 등 테이블 연결 필요
    @GetMapping
    public ResponseEntity<List<WorkDto>> workList() {
        return new ResponseEntity<>(workService.getAllWorks(),HttpStatus.OK);
    }

    // 작품 상세 조회
    @GetMapping("/infos/{work_id}")
    public ResponseEntity<WorkDto> workDetail(@PathVariable Long work_id) {
        return new ResponseEntity<>(workService.getWorkById(work_id), HttpStatus.OK);
    }

    // 작가 작품 조회
    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<WorkDto>> workByUser(@PathVariable Long user_id) {
        return new ResponseEntity<>(workService.getWorkByUser(user_id), HttpStatus.OK);
    }

    // 전시 작품 조회
    @GetMapping("/exhibit/{exhibition_id}")
    public ResponseEntity<List<WorkDto>> workByExhibition(@PathVariable Long exhibition_id) {
        return new ResponseEntity<>(workService.getWorkByExhibition(exhibition_id), HttpStatus.OK);
    }

    // 작품 찜하기/취소
    @PostMapping("/like/{work_id}")
    public ResponseEntity<String> like(Authentication authentication, @PathVariable("work_id") Long work_id) {
        workService.likeWork(authentication.getName(),work_id);
        return new ResponseEntity<>("Success",HttpStatus.OK);
    }

    // 작품 찜 수 조회
    @GetMapping("/like/count/{work_id}")
    public ResponseEntity<Integer> likecount(@PathVariable("work_id") Long work_id) {
        return new ResponseEntity<>(workService.likeCount(work_id), HttpStatus.OK);
    }
}
