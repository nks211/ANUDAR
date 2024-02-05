package com.ssafy.anudar.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Order(Ordered.HIGHEST_PRECEDENCE + 99) // spring security 보다 인터셉터의 우선 순위를 올리기 위해
@Component
@RequiredArgsConstructor
public class FilterChannelInterceptor implements ChannelInterceptor {
//    private final JwtTokenProvider

    // preSend : 메시지가 채널로 전송되기 전에 호출되는 메소드
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        // StompHeaderAccessor : STOMP 헤더에 접근할 수 있다
        // 클라이언트에서 커스텀 헤더에 JWT를 실어보냈으므로 Accessor로 접근!
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        assert headerAccessor != null;

        if (!StompCommand.UNSUBSCRIBE.equals(headerAccessor.getCommand()) && !StompCommand.DISCONNECT.equals(headerAccessor.getCommand())) {
            String authorizationHeader = String.valueOf(headerAccessor.getNativeHeader("Authorization"));
            if (authorizationHeader == null || authorizationHeader.equals("null")) {
                throw new MessageDeliveryException("로그인 후 이용해주세요.");
            }

            String token = Objects.requireNonNull(headerAccessor.getNativeHeader("Authorization")).get(0)
                    .replace("Bearer ", "");
//            try {
//                jwtTokenProvider
//            }
        }
        return message;
    }
}
