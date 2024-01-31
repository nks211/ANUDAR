package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.model.Docent;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AuctionDto {
    private LocalDateTime start_time;

    public static AuctionDto fromEntity (Auction auction) {
        return new AuctionDto(
                auction.getStart_time()
        );
    }
}
