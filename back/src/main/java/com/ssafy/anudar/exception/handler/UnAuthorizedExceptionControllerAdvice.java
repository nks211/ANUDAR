package com.ssafy.anudar.exception.handler;

import com.ssafy.anudar.exception.UnAuthorizedException;
import com.ssafy.anudar.exception.response.ErrorResponse;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import jakarta.annotation.Priority;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Priority(0)
@RestControllerAdvice
public class UnAuthorizedExceptionControllerAdvice {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnAuthorizedException.class)
    public ErrorResponse handlerException(UnAuthorizedException e) {
        return new ErrorResponse(e.getExceptionInfo());
    }

}