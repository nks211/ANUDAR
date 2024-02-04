package com.ssafy.anudar.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class AuctionWebSocketConfig implements WebSocketMessageBrokerConfigurer {
    // 웹소켓 서버의 엔드포인트 : ws
    // 클라이언트는 다른 origin이므로 cors 오류 방지 위해 setAllowedOrigins 설정
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*");
    }

    // enableSimpleBroker 사용해서 /sub 가 붙은 destination의 클라리언트에게
    // 메시지를 보낼 수 있도록 SimpleBroker 등록
    // setApplicationDestinationPrefixes : /pub가 prefix로 붙은 메시지들은 @MessageMapping이 붙은 method로 바운드
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }
}
