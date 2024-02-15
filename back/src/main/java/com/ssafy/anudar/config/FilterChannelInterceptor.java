package com.ssafy.anudar.config;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;


import java.util.Objects;

@Order(Ordered.HIGHEST_PRECEDENCE + 99) // spring security 보다 인터셉터의 우선 순위를 올리기 위해
@RequiredArgsConstructor
public class FilterChannelInterceptor implements ChannelInterceptor {
    //    private final JwtUtil jwtUtil;
    private final String key;

    // preSend : 메시지가 채널로 전송되기 전에 호출되는 메소드
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        // StompHeaderAccessor : STOMP 헤더에 접근할 수 있다
        // 클라이언트에서 커스텀 헤더에 JWT를 실어보냈으므로 Accessor로 접근!
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        assert headerAccessor != null;

        // 인증하는 과정 : 연결시에만 체크
        if (headerAccessor.getCommand() == StompCommand.CONNECT) {
            String authorizationHeader = String.valueOf(headerAccessor.getNativeHeader("Authorization"));
            System.out.println(headerAccessor);
            if (authorizationHeader == null || authorizationHeader.equals("null")) {
                throw new MessageDeliveryException("로그인 후 이용해주세요.");
            }

            String token = Objects.requireNonNull(headerAccessor.getNativeHeader("Authorization")).get(0)
                    .replace("Bearer ", "");
            try {
                // 토큰 권한 확인
                JwtUtil.isExpired(token, key);
            } catch (MessageDeliveryException e) {
                throw new MessageDeliveryException("메세지 에러");
            } catch (SecurityException | MalformedJwtException | ExpiredJwtException
                     | UnsupportedJwtException | IllegalArgumentException e) {
                throw new MessageDeliveryException("인증 정보가 올바르지 않습니다. 다시 로그인 후 이용해주세요.");
            }
        }
        return message;
    }
}
