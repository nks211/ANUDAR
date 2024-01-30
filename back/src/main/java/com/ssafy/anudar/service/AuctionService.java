package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.AuctionVideoDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.model.AuctionVideo;
import com.ssafy.anudar.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuctionService {


    private final AuctionRepository auctionRepository;
    private final AuctionVideoService auctionVideoService;


    // ExceptionStatud 를 직접 생성해서 전달하지 않고 그냥 문자열을 전달!!
    public class BadRequestException extends RuntimeException {
        public BadRequestException(String message) {
            super(message);
        }
    }


    // 매월 말에 실행되는 스케줄된 작업
    @Scheduled(cron = "0 0 17 ? * SAT") // 매월 마지막 주 토요일 17:00에 실행
    public void generateMonthlyAuction() {
        // 경매 비디오를 생성하는 로직을 여기에 구현
        AuctionVideo newAuctionVideo = auctionVideoService.generateAuctionVideo();

        // 새로 생성된 경매 비디오를 연결하여 저장
        Auction newAuction = newAuctionVideo.getAuction();
        newAuction.setAuctionVideo(newAuctionVideo);
        auctionRepository.save(newAuction);

    }

    public AuctionVideoDto getAuctionVideo(Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new BadRequestException("Auction not found with ID: " + auctionId));

        AuctionVideo auctionVideo = auction.getAuctionVideo();
        // 해당 비디오가 없는 경우 처리
        if(auctionVideo == null){
            throw new BadRequestException("Auction with ID " + auctionId + " does not have an associated video.");
        }

        // AuctionVideo  -> AuctioncideoDto로 변환하는 작업
        AuctionVideoDto auctionVideoDto = convertToDto(auctionVideo);

        return auctionVideoDto;
    }

    private AuctionVideoDto convertToDto(AuctionVideo auctionVideo) {
        AuctionVideoDto auctionVideoDto = new AuctionVideoDto();
        auctionVideoDto.getId();

        return auctionVideoDto;
    }
}
