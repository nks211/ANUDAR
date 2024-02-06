package com.ssafy.anudar.controller;

import com.ssafy.anudar.S3.FileFolder;
import com.ssafy.anudar.S3.S3Service;
import com.ssafy.anudar.dto.ExhibitionDetailDto;
import com.ssafy.anudar.dto.ExhibitionDto;
import com.ssafy.anudar.dto.request.ExhibitionRegistRequest;
import com.ssafy.anudar.dto.ReviewDto;
import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.service.ExhibitionService;
import com.ssafy.anudar.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exhibit")
public class ExhibitionController {

    private final ExhibitionService exhibitionService;
    private final ReviewService reviewService;
    private final S3Service s3Service;

    // 전시회 등록
    @PostMapping("/regist")
    public ResponseEntity<ExhibitionDto> regist(Authentication authentication, @RequestBody ExhibitionRegistRequest req) {
        ExhibitionDto exhibitionDto = exhibitionService
                .saveExhibition(req.getName(), req.getDetail(), req.getStart_time(), req.getEnd_time(), req.getImage(), authentication.getName(),
                        req.getDocent_start(), req.getDocent_end(),
                        req.getWorks());
        return new ResponseEntity<>(exhibitionDto, HttpStatus.OK);
    }

    // 전시회 사진 등록
    @PostMapping("/img")
    public ResponseEntity<String> img(@RequestParam(value="image") MultipartFile image) {
        return new ResponseEntity<>(s3Service.uploadFile(image, FileFolder.EXHIBIT_IMG), HttpStatus.OK);
    }

    // 작품 사진 등록
    @PostMapping("/workImgs")
    public ResponseEntity<List<String>> uploadImages(@RequestPart(value="workImgs") List<MultipartFile> images) {
        List<String> uploadedUrls = new ArrayList<>();

        for (MultipartFile image : images) {
            String url = s3Service.uploadFile(image, FileFolder.WORK_IMG);
            uploadedUrls.add(url);
        }

        return new ResponseEntity<>(uploadedUrls, HttpStatus.OK);
    }

    // 전시회 전체 조회
    @GetMapping("/list")
    public ResponseEntity<List<ExhibitionDto>> list() {
        List<ExhibitionDto> exhibitions = exhibitionService.getAllExhibitions();
        return new ResponseEntity<>(exhibitions, HttpStatus.OK);
    }

    // 전시회 상세 조회
    @GetMapping("/list/{exhibition_id}")
    public ResponseEntity<ExhibitionDetailDto> exhibitionDetail(@PathVariable Long exhibition_id) {
        return new ResponseEntity<>(exhibitionService.getExhibitionById(exhibition_id), HttpStatus.OK);
    }

    // 전시회 좋아요/취소
    @PostMapping("/like/{exhibition_id}")
    public ResponseEntity<String> like(Authentication authentication, @PathVariable("exhibition_id") Long exhibition_id){
        exhibitionService.likeExhibition(authentication.getName(), exhibition_id);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }


   // 전시회 방명록 작성하기
    @PostMapping("/{exhibition_id}/regist-comment")
    public ResponseEntity<ReviewDto> createExhibitionReview(Authentication authentication, @PathVariable Exhibition exhibition_id, @RequestBody String comment){

        // 현재 로그인한 사용자의 정보를 가져와서 리뷰 작성자로 설정
        String username = authentication.getName();

        ReviewDto reviewRequest = reviewService
                .saveReview(comment, exhibition_id, username);
        return new ResponseEntity<>(reviewRequest, HttpStatus.OK);
    }

    // 전시회 방명록 조회하기
    @GetMapping("/{exhibition_id}/comments-list")
    public ResponseEntity<List<ReviewDto>> listComments(@PathVariable Long exhibition_id) {
        return new ResponseEntity<>(reviewService.getAllExhibitionReviews(exhibition_id), HttpStatus.OK);
    }

    // 방명록 삭제
    @DeleteMapping("/{review_id}")
    public ResponseEntity<String> deleteComment(Authentication authentication, @PathVariable Long review_id) {
        reviewService.deleteReview(authentication, review_id);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    // 현재 진행중인 전시 가져오기
    @GetMapping("/list/current")
    public ResponseEntity<List<ExhibitionDto>> listCurrent() {
        return new ResponseEntity<>(exhibitionService.getCurrentExhibitions(), HttpStatus.OK);
    }

}