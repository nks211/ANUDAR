package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.repository.AuctionRepository;
import com.ssafy.anudar.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final WorkRepository workRepository;

    // 경매 할 작품을 가져오기
    public List<WorkDto> getWorks() {
        Optional<Auction> preAuction = auctionRepository.findPreviusAuction(LocalDateTime.now());
        Auction nextAuction = auctionRepository.findNextAuction(LocalDateTime.now())
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.AUCTION_NOT_FOUND));
        // 이전 경매가 존재 / orElse
        return preAuction.map(auction -> workRepository.findAuctionWorks(auction.getStart_time().minusDays(10), nextAuction.getStart_time().minusDays(10))
                .stream().map(WorkDto::fromEntity)
                .toList()).orElseGet(() -> workRepository.findAllPrevAuctionWorks(nextAuction.getStart_time().minusDays(10))
                .stream().map(WorkDto::fromEntity)
                .toList());
    }

}
