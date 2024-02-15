package com.ssafy.anudar.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class AuctionBidDto {
    private String sessionId;
    private String nickname;
    private Integer workId;
    private Integer askingprice;
    private Integer nowNumber;
    private Integer countNumber;
}
