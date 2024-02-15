package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.AuctionBidDto;
import com.ssafy.anudar.dto.AuctionStatusDto;
import com.ssafy.anudar.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private Integer currentBid = 0 ; // 현재가를 저장하는 변수 : 나중엔 startprice로 설정 => 로컬에 값을 저장해두어야 하지 않을갑..
    private String currentBidUser = "응찰한 사용자가 없습니다.";
    private Integer nownumber = 1;

    @MessageMapping("/chat/{sessionId}")
    public void sendMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor) {
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getSessionId(), chatDto);
    }

    @MessageMapping("/auctionbid/{sessionId}")
    public void handleAuctionBidMessage(AuctionBidDto auctionBidDto, SimpMessageHeaderAccessor accessor){
        // 여기서 현재가 갱신 로직 수행
        Integer askingprice = auctionBidDto.getAskingprice();
        String askingBidUser = auctionBidDto.getNickname();

        // 여기 저장되어 있는 번호보다 크면 저장해주기
        if (nownumber < auctionBidDto.getNowNumber()){
            nownumber = auctionBidDto.getNowNumber();
            currentBid = 0;
            currentBidUser = "응찰한 사용자가 없습니다.";
        }


        if (askingprice > currentBid) {
            currentBid = askingprice;
            currentBidUser = askingBidUser;

        }

        // AuctionStatusDto를 생성하고 현재가 및 최고 입찰자 정보 설정
        AuctionStatusDto auctionStatusDto = new AuctionStatusDto();
        auctionStatusDto.setSessionId(auctionBidDto.getSessionId());
        auctionStatusDto.setNickname(auctionBidDto.getNickname());
        auctionStatusDto.setAskingprice(auctionBidDto.getAskingprice());
        auctionStatusDto.setWorkId(auctionBidDto.getWorkId());
        auctionStatusDto.setCurrentBid(currentBid);
        auctionStatusDto.setCurrentBidUser(currentBidUser);
        auctionStatusDto.setNowNumber(nownumber);

        // 갱신된 현재가를 프론트로 전달
        simpMessagingTemplate.convertAndSend("/sub/auctionbid/" + auctionBidDto.getSessionId(), auctionStatusDto);
    }

}
