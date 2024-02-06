package com.ssafy.anudar.controller;

<<<<<<< HEAD
=======
import com.ssafy.anudar.dto.WorkDto;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
import com.ssafy.anudar.model.Work;
import com.ssafy.anudar.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/work")
public class WorkController {

    private final WorkService workService;

    // 작품 전체 조회 : 작가 등 테이블 연결 필요
    @GetMapping
<<<<<<< HEAD
    public ResponseEntity<List<Work>> infos() {
        List<Work> works = workService.getAllWorks();
        return new ResponseEntity<>(works,HttpStatus.OK);
=======
    public ResponseEntity<List<WorkDto>> workList() {
        return new ResponseEntity<>(workService.getAllWorks(),HttpStatus.OK);
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    }

    // 작품 상세 조회
    @GetMapping("/infos/{work_id}")
<<<<<<< HEAD
    public ResponseEntity<Work> workDetail(@PathVariable Long work_id) {
        Optional<Work> workOptional = workService.getWorkById(work_id);

        return workOptional
                .map(workDto -> new ResponseEntity<>(workDto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
=======
    public ResponseEntity<WorkDto> workDetail(@PathVariable Long work_id) {
        return new ResponseEntity<>(workService.getWorkById(work_id), HttpStatus.OK);
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    }

    // 작가 작품 조회
    @GetMapping("/user/{user_id}")
<<<<<<< HEAD
    public ResponseEntity<List<Work>> workByUser(@PathVariable Long user_id) {
        List<Work> works = workService.getWorkByUser(user_id);
        return new ResponseEntity<>(works, HttpStatus.OK);
=======
    public ResponseEntity<List<WorkDto>> workByUser(@PathVariable Long user_id) {
        return new ResponseEntity<>(workService.getWorkByUser(user_id), HttpStatus.OK);
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    }

    // 전시 작품 조회
    @GetMapping("/exhibit/{exhibition_id}")
<<<<<<< HEAD
    public ResponseEntity<List<Work>> workByExhibition(@PathVariable Long exhibition_id) {
        List<Work> works = workService.getWorkByExhibition(exhibition_id);
        return new ResponseEntity<>(works, HttpStatus.OK);
    }

    // 작품 찜하기
    @PostMapping("/like/{work_id}")
    public ResponseEntity<String> like(Authentication authentication, @PathVariable("work_id") Long work_id) {
        System.out.println(authentication);
        return new ResponseEntity<>(workService.likeWork(authentication.getName(),work_id),HttpStatus.OK);
    }

    // 작품 찜하기 취소
    @DeleteMapping("/unlike/{work_id}")
    public ResponseEntity<String> unlike(Authentication authentication, @PathVariable("work_id") Long work_id) {
        return new ResponseEntity<>(workService.unlikeWork(authentication.getName(), work_id), HttpStatus.OK);
=======
    public ResponseEntity<List<WorkDto>> workByExhibition(@PathVariable Long exhibition_id) {
        return new ResponseEntity<>(workService.getWorkByExhibition(exhibition_id), HttpStatus.OK);
    }

    // 작품 찜하기/취소
    @PostMapping("/like/{work_id}")
    public ResponseEntity<String> like(Authentication authentication, @PathVariable("work_id") Long work_id) {
        workService.likeWork(authentication.getName(),work_id);
        return new ResponseEntity<>("Success",HttpStatus.OK);
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    }

    // 작품 찜 수 조회
    @GetMapping("/like/count/{work_id}")
    public ResponseEntity<Integer> likecount(@PathVariable("work_id") Long work_id) {
        return new ResponseEntity<>(workService.likeCount(work_id), HttpStatus.OK);
    }
}
