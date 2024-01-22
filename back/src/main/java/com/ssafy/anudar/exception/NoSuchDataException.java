package com.ssafy.anudar.exception;

import com.ssafy.anudar.exception.response.ExceptionInfo;
import lombok.Getter;

@Getter
public class NoSuchDataException extends RuntimeException{

    private final ExceptionInfo exceptionInfo;

    public NoSuchDataException(ExceptionInfo exceptionInfo) {
        super(exceptionInfo.getMessage());
        this.exceptionInfo = exceptionInfo;
    }

}
