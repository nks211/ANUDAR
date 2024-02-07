package com.ssafy.anudar.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Data
@Setter
public class AuctionStatusDto {
    private String sessionId;
    private String username;
    //    private Work work;
    private Integer askingprice;
    private Integer currentBid;
    private String currentBidUser;
}
