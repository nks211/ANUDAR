package com.ssafy.anudar.controller;

import com.ssafy.anudar.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.ssafy.anudar.dto.PaymentApproveDto;
import com.ssafy.anudar.dto.PaymentReadyDto;
import com.ssafy.anudar.dto.request.PaymentApproveRequestDto;
import com.ssafy.anudar.dto.request.PaymentReadyRequestDto;
import com.ssafy.anudar.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor

public class PaymentController {
    private final PaymentService paymentService;
    private final UserService userService;

    @PostMapping("/kakaoPayReady")
    public ResponseEntity<PaymentReadyDto> kakaoPayReady(@RequestBody PaymentReadyRequestDto requestDto) {

        // 현재 인증된 사용자의 정보를 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Long userId = userService.findUserIdByUsername(username);

        PaymentReadyDto paymentReadyResponseDto = paymentService.preparePayment(requestDto, userId);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(paymentReadyResponseDto.getTid())
                .toUri();

        return ResponseEntity.created(uri).body(paymentReadyResponseDto);
    }

    @PostMapping("/kakaoPayApprove")
    public ResponseEntity<PaymentApproveDto> kakaoPayApprove(@RequestBody PaymentApproveRequestDto requestDto) {
        PaymentApproveDto paymentApproveResponseDto = paymentService.approvePayment(requestDto);
        return ResponseEntity.ok(paymentApproveResponseDto);
    }

    @GetMapping("/approval")
    public String paymentApproval(@RequestParam("pg_token") String pgToken) {

        return "redirect:/order/completed";
    }

    @GetMapping("/fail")
    public String paymentFail() {
        return "redirect:/kakaopay-fail";
    }

    @GetMapping("/cancel")
    public String paymentCancel() {
        return "redirect:/kakaopay-cancel";
    }
}
