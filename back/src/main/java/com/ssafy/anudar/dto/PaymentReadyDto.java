package com.ssafy.anudar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentReadyDto {
    private String tid;                     // 결제 고유 번호
    private String next_redirect_mobile_url;
    private String next_redirect_pc_url;    // 요청한 클라이언트가 PC 웹일 경우
    private String created_at;              // 결제 준비 요청 시간
}
