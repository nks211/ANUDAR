package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.PayApproveResDto;
import com.ssafy.anudar.dto.PayInfoDto;
import com.ssafy.anudar.dto.PayReadyResDto;
import com.ssafy.anudar.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class KaKaoPayController {

    private final KakaoPayService kakaoPayService;

    /**
     * 결제 준비 redirect url 받기 ---> 상품명과 가격을 같이 보내줘야 함
     */

    @PostMapping("/ready")
    public ResponseEntity<PayReadyResDto> getRedirectUrl(@RequestBody PayInfoDto payInfoDto) throws Exception {
        PayReadyResDto response = kakaoPayService.getRedirectUrl(payInfoDto);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/success/{id}")
    public ResponseEntity<PayApproveResDto> afterGetRedirectUrl(@PathVariable("id") Long id, @RequestParam("pg_token") String pgToken) throws Exception {
        PayApproveResDto kakaoApprove = kakaoPayService.getApprove(pgToken, id);
        return ResponseEntity.ok(kakaoApprove);
    }

    @GetMapping("/cancel")
    public ResponseEntity<?> cancel() {
        // 결제 취소가 성공적으로 처리됨을 나타냄
        return ResponseEntity.ok("사용자가 결제를 취소하였습니다.");
    }

    @GetMapping("/fail")
    public ResponseEntity<?> fail() {
        // 결제 실패를 나타내는 더 적절한 상태 코드 사용
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("결제가 실패하였습니다.");
    }

}
