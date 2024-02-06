package com.ssafy.anudar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.LinkedMultiValueMap;

@Getter
@AllArgsConstructor
public class PayRequest {
    private String url;   // 요청을 보낼 카카오 api url
    private LinkedMultiValueMap<String, String> map;  // 요청을 담을 request
}
