package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.model.AuctionWork;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AuctionWorkDto {
    private Long id;
    private int finalPrice;
    private Work work;
    private User user;
    private Auction auction;

    public static AuctionWorkDto fromEntity (AuctionWork auctionWork) {
        return new AuctionWorkDto(
                auctionWork.getId(),
                auctionWork.getFinalPrice(),
                auctionWork.getWork(),
                auctionWork.getUser(),
                auctionWork.getAuction()
        );
    }
}
