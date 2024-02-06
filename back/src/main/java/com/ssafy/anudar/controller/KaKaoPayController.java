package com.ssafy.anudar.controller;

import com.ssafy.anudar.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class KaKaoPayController {

    private final KakaoPayService kakaoPayService;

//
}
