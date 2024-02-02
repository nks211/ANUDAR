package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.request.AutionBidRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/live")
@RequiredArgsConstructor
public class AuctionBidController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/chat")
    public void sendMessage(AutionBidRequest req, SimpMessageHeaderAccessor accessor){
        simpMessagingTemplate.convertAndSend("/sub/chat/" + req.getChannelId(), req);
    }
}
