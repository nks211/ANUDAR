package com.ssafy.anudar.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
public class DocentDto {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String video;  // 도슨트 주소
    private long exhibitionId;
}
