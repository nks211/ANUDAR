package com.ssafy.anudar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentReadyRequestDto {
    private String cid;                 // 가맹점 코드
    private String partner_order_id;    // 가맹점 주문 번호
    private String partner_user_id;     // 가맹점 회원 id
    private String item_name;           // 상품명
    private Long quantity;           // 상품 수량
    private Long total_amount;       // 상품 총액
    private Long vat_amount;         // 상품 부과세
    private Long tax_free_amount;    // 상품 비과세 금액
    private String approval_url;        // 결제 성골 시 redirect url
    private String cancel_url;          // 결제 취소 시 redirect url
    private String fail_url;            // 결제 실패 시 redirect url


}
