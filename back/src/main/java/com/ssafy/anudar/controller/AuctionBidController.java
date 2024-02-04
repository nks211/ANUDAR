package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.AuctionBidDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuctionBidController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/auctionbid/{sessionId}")
    public void sendMessage(AuctionBidDto auctionBidDto, SimpMessageHeaderAccessor accessor){
        simpMessagingTemplate.convertAndSend("/sub/auctionbid/" + auctionBidDto.getSessionId(), auctionBidDto);
    }
}
