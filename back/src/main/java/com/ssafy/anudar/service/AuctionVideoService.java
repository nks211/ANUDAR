package com.ssafy.anudar.service;

import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.model.AuctionVideo;
import com.ssafy.anudar.repository.AuctionRepository;
import com.ssafy.anudar.repository.AuctionVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;

@Service
public class AuctionVideoService {

    private final AuctionVideoRepository auctionVideoRepository = null;
    private final AuctionRepository auctionRepository = null;


    public AuctionVideo generateAuctionVideo() {
        // 경매 시작 시간 설정: 매월 마지막 주 토요일 17:00
        LocalDateTime startTime = LocalDateTime.now().with(TemporalAdjusters.lastInMonth(DayOfWeek.SATURDAY)).withHour(17).withMinute(0).withSecond(0);

        Auction newAuction = new Auction();
        newAuction.setStart_time(startTime);

        // OpenVidu 세션 생성 및 토큰 발급????
//        String sessionName = "auctionSession_" + newAuction.getId();
//        String token = openViduClient.generateToken(sessionName);

        // Auction 저장
        auctionRepository.save(newAuction);

        AuctionVideo auctionVideo = new AuctionVideo();
        auctionVideo.setVideoUrl("https://anudar.com/auction");
        auctionVideo.setCreationTime(startTime);
//        auctionVideo.setSessionName(sessionName);
//        auctionVideo.setToken(token);

        // AuctionVideo를 저장
        auctionVideoRepository.save(auctionVideo);

        return auctionVideo;
    }
}
