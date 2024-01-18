package com.ssafy.anudar.exception.handler;

import com.ssafy.anudar.exception.NoSuchDataException;
import com.ssafy.anudar.exception.response.ErrorResponse;
import jakarta.annotation.Priority;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Priority(0)
@RestControllerAdvice
public class NoSuchDataExceptionControllerAdvice {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchFieldException.class)
    public ErrorResponse handlerException(NoSuchDataException e) {
        return new ErrorResponse(e.getExceptionInfo());
    }

}
