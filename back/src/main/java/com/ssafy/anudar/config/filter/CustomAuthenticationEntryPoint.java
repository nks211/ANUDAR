package com.ssafy.anudar.config.filter;

import com.ssafy.anudar.exception.response.ExceptionStatus;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setStatus(ExceptionStatus.UNAUTHORIZED.getStatus());
        response.getWriter().write("{"+
                "\"code\":"  + 3000 + ", "+
                "\"status\":"  + 401 + ", "+
                "\"message\":" + "\"" + "사용자가 인증되지 않았습니다." +"\"" + "}");
    }
}
