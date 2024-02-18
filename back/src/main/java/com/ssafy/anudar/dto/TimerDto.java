package com.ssafy.anudar.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class TimerDto {
    private String sessionId;
    private int time;
}
