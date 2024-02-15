package com.ssafy.anudar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WorkRegistRequest {
    private String title;
    private String detail;
    private int price;
    private String image;
    private Boolean is_carousel;
}
