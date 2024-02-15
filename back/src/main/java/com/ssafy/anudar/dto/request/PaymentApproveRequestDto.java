package com.ssafy.anudar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentApproveRequestDto {
    private String cid;                // 가맹점 코드
    private String tid;                 // 결제 고유 번호
    private String partner_order_id;    // 가맹점 주문 번호
    private String partner_user_id;     // 가맹점 회원 번호
    private String pg_token;            // 결제승인 요청을 인증하는 토큰

}
