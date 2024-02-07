package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.AuctionBidDto;
import com.ssafy.anudar.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuctionBidController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/chat/{sessionId}")
    public void handleChatMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor){
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getSessionId(), chatDto);
    }
    @MessageMapping("/auctionbid/{sessionId}")
    public void handleAuctionBidMessage(AuctionBidDto auctionBidDto, SimpMessageHeaderAccessor accessor){
        // 여기서 현재가 갱신 로직 수행

        // 갱신된 현재가를 프론트로 전달
        simpMessagingTemplate.convertAndSend("/sub/auctionbid/" + auctionBidDto.getSessionId(), auctionBidDto);
    }
}
