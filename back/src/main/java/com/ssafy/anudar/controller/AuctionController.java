package com.ssafy.anudar.controller;


import com.ssafy.anudar.dto.AuctionVideoDto;
import com.ssafy.anudar.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auction")
@RequiredArgsConstructor
public class AuctionController {

    private final AuctionService auctionService;

    // 경매 영상 조회
    @GetMapping("/{auction_id}/video")
    public AuctionVideoDto getAuctionVideo(@PathVariable Long auction_id) {
        return auctionService.getAuctionVideo(auction_id);
    }
}
