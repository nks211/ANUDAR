package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.service.WorkService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/work")
public class WorkController {
    private final WorkService workService;

    // 작품 전체 조회 : 작가 등 테이블 연결 필요
    @GetMapping("/infos")
    public List<WorkDto> infos() {
        return workService.getWorksAll();
    }

//    // 작품 찜하기
//    @PostMapping("/like")
//    public String insert(@RequestParam Long userId, Long workId) {
//        WorkService.likeWork(user, work)
//        return "좋아요";
//    }
//
//    // 작품 찜하기 취소
//    @DeleteMapping
//    public String delete(@RequestBody) {
//        return "좋아요 취소";
//    }
}
