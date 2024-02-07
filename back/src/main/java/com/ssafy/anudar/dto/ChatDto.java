package com.ssafy.anudar.dto;

import lombok.Data;

@Data
public class ChatDto {
    private String sessionId;
    private String username;
    private String message;
}
