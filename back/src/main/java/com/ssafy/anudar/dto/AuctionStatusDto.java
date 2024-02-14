package com.ssafy.anudar.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class AuctionStatusDto {
    private String sessionId;
    private String nickname;
    //    private Work work;
    private Integer askingprice;
    private Integer currentBid;
    private String currentBidUser;
}
