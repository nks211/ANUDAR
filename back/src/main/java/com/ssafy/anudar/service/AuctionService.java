package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.AuctionDto;
import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuctionService {

    private final AuctionRepository auctionRepository;

    // 현재 진행 중인 경매 조회
//    public AuctionDto getCurrentAuction() {
//        Auction currentAuction = auctionRepository.findFirstByOrderByIdAsc()
//                .orElseThrow(() -> new RuntimeException("No active auction found"));
//
//        return AuctionDto.fromEntity(currentAuction);
//    }
}
