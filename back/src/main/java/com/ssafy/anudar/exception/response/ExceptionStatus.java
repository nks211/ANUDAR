package com.ssafy.anudar.exception.response;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum ExceptionStatus implements ExceptionInfo {

    // NOT FOUND
    USER_NOT_FOUND(1000, HttpStatus.NOT_FOUND.value(), "사용자가 존재하지 않습니다."),
    EXHIBIT_NOT_FOUND(1001, HttpStatus.NOT_FOUND.value(), "전시가 존재하지 않습니다."),

    LIKE_NOT_FOUND(1002, HttpStatus.NOT_FOUND.value(), "좋아요가 존재하지 않습니다."),
    NOTIFICATION_NOT_FOUND(1003, HttpStatus.NOT_FOUND.value(), "알림이 존재하지 않습니다"),

    WORK_NOT_FOUND(1002, HttpStatus.NOT_FOUND.value(), "작품이 존재하지 않습니다."),
    REVIEW_NOT_FOUND(1003, HttpStatus.NOT_FOUND.value(), "방명록이 존재하지 않습니다."),
    RECORD_NOT_FOUND(1004, HttpStatus.NOT_FOUND.value(), "동영상이 존재하지 않습니다."),
    AUCTION_NOT_FOUND(1005, HttpStatus.NOT_FOUND.value(), "경매가 존재하지 않습니다."),
    PAYMENT_NOT_FOUND(1006, HttpStatus.NOT_FOUND.value(), "결제 정보가 존재하지 않습니다"),


    // BAD_REQUEST
    DUPLICATE_USERNAME(2000, HttpStatus.BAD_REQUEST.value(), "사용자가 이미 존재합니다."),
    PASSWORD_MISMATCH(2001, HttpStatus.BAD_REQUEST.value(), "비밀번호가 일치하지 않습니다."),
    FOLLOW_SELF(2002, HttpStatus.BAD_REQUEST.value(), "스스로를 팔로우 할 수 없습니다."),
    DUPLICATE_FOLLOW(2003, HttpStatus.BAD_REQUEST.value(), "이미 팔로우하고 있는 사용자입니다."),
    DUPLICATE_NICKNAME(2004, HttpStatus.BAD_REQUEST.value(), "닉네임이 이미 존재합니다."),

    // UNAUTHORIZED
    UNAUTHORIZED(3000, HttpStatus.UNAUTHORIZED.value(), "사용자가 인증되지 않았습니다.")

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
