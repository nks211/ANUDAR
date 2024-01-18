package com.ssafy.anudar.exception.response;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum ExceptionStatus implements ExceptionInfo {

    // NOT FOUND
    USER_NOT_FOUND(1, HttpStatus.NOT_FOUND.value(), "유저가 존재하지 않습니다."),
    EXHIBIT_NOT_FOUND(2, HttpStatus.NOT_FOUND.value(), "전시가 존재하지 않습니다."),

    // UNAUTHORIZED
    UNAUTHORIZED(101, HttpStatus.UNAUTHORIZED.value(), "유저가 인증되지 않았습니다.")
    ,;

    private final int code;
    private final int status;
    private final String message;

    @Override
    public int getCode() {
        return code;
    }

    @Override
    public int getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
