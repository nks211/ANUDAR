package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.ExhibitionDto;
import com.ssafy.anudar.dto.request.ExhibitionRegistRequest;
import com.ssafy.anudar.dto.request.ReviewRequest;
import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.ExhibitionReview;
import com.ssafy.anudar.service.ExhibitionService;
import com.ssafy.anudar.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exhibit")
public class ExhibitionController {

    private final ExhibitionService exhibitionService;
    private final ReviewService reviewService;

    // 전시회 등록
    @PostMapping("/regist")
    public ResponseEntity<ExhibitionDto> regist(Authentication authentication, @RequestBody ExhibitionRegistRequest req) {
        ExhibitionDto exhibitionDto = exhibitionService
                .saveExhibition(req.getName(), req.getDetail(), req.getStart_time(), req.getEnd_time(), authentication.getName(),
                        req.getDocent_start(), req.getDocent_end(),
                        req.getWorks_title(), req.getWorks_detail(), req.getWorks_price(), req.getWorks_image());
        return new ResponseEntity<>(exhibitionDto, HttpStatus.OK);
    }

    // 전시회 전체 조회
    @GetMapping("/list")
    public ResponseEntity<List<Exhibition>> list() {
        List<Exhibition> exhibitions = exhibitionService.getAllExhibitions();
        return new ResponseEntity<>(exhibitions, HttpStatus.OK);
    }

    // 전시회 상세 조회
    @GetMapping("/list/{exhibition_id}")
    public ResponseEntity<Exhibition> exhibitionDetail(@PathVariable Long exhibition_id) {
        Optional<Exhibition> exhibitionOptional = exhibitionService.getExhibitionById(exhibition_id);

        return exhibitionOptional
                .map(exhibitionDto -> new ResponseEntity<>(exhibitionDto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 전시회 좋아요
    @PostMapping("/like/{exhibition_id}")
    public String like(Authentication authentication, @PathVariable("exhibition_id") Long exhibition_id){
        exhibitionService.likeExhibition(authentication.getName(), String.valueOf(exhibition_id));
        return "좋아요";
    }

    // 전시회 좋아요 취소 하기
    @DeleteMapping("/unlike/{exhibition_id}")
    public String unlike(Authentication authentication, @PathVariable("exhibition_id") Long exhibition_id){
        exhibitionService.unlikeExhibition(authentication.getName(), String.valueOf(exhibition_id));
        return "좋아요 취소";
    }

   // 전시회 방명록 작성하기
    @PostMapping("/{exhibition_id}/regist-comment")
    public ResponseEntity<ReviewRequest> createExhibitionReview(Authentication authentication, @PathVariable Exhibition exhibition_id, @RequestBody ReviewRequest req){

        // 현재 로그인한 사용자의 정보를 가져와서 리뷰 작성자로 설정
        String username = authentication.getName();

        ReviewRequest reviewRequest = reviewService
                .saveReview(req.getContent(), exhibition_id, username);
        return new ResponseEntity<>(reviewRequest, HttpStatus.OK);
    }

    // 전시회 방명록 조회하기
    @GetMapping("/{exhibition_id}/comments-list")
    public ResponseEntity<List<ExhibitionReview>> listComments(@PathVariable Long exhibition_id) {
        List<ExhibitionReview> exhibitionReviews = reviewService.getAllExhibitionReviews(exhibition_id);
        return new ResponseEntity<>(exhibitionReviews, HttpStatus.OK);
    }
}