package com.ssafy.anudar.exception;

import com.ssafy.anudar.exception.response.ExceptionInfo;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import lombok.Getter;

@Getter
public class BadRequestException extends RuntimeException {

    private final ExceptionInfo exceptionInfo;

    public BadRequestException(ExceptionStatus exceptionInfo) {
        super(exceptionInfo.getMessage());
        this.exceptionInfo = exceptionInfo;
    }
}
