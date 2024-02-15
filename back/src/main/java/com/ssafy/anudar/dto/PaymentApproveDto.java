package com.ssafy.anudar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentApproveDto {
    private String aid;
    private String tid;
    private String cid;
    private String partner_order_id;
    private String partner_user_id;

}
