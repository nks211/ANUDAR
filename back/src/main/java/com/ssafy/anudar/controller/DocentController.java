package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.DocentDto;
import com.ssafy.anudar.service.DocentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/docents")
@RequiredArgsConstructor
public class DocentController {

    private final DocentService docentService;

    // 도슨트 만들기
    @PostMapping("/create")
    public ResponseEntity<String> createDocent(@RequestBody DocentDto docentDto) {
        try {
            // DTO를 엔터티로 변환하여 서비스에 전달
            docentService.createDocent(docentDto);
            return ResponseEntity.ok("Docent created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating Docent: " + e.getMessage());
        }
    }

    // 도슨트 조회하기
    @GetMapping("/{docentId}")
    public ResponseEntity<String> getDocent(@PathVariable Long docentId) {
        try {
            // 서비스를 통해 도슨트 정보 조회
            DocentDto docentDTO = docentService.getDocentById(docentId);
            return ResponseEntity.ok(String.valueOf(docentDTO));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Docent not found");
        }
    }

    // 도슨트 영상 기록하기

    // 도슨트 나가기
}
