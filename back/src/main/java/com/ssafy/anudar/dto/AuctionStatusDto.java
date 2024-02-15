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
    private Integer workId;
    private Integer askingprice;
    private Integer currentBid;
    private String currentBidUser;
    private Integer nowNumber;
}
