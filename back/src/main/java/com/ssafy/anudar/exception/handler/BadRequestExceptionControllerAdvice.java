package com.ssafy.anudar.exception.handler;

import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ErrorResponse;
import jakarta.annotation.Priority;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Priority(0)
@RestControllerAdvice
public class BadRequestExceptionControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public ErrorResponse handlerException(BadRequestException e) {
        return new ErrorResponse(e.getExceptionInfo());
    }
}
