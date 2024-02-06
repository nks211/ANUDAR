package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Work;
import lombok.Data;

@Data
public class AuctionBidDto {
    private String sessionId;
    private String username;
//    private Work work;
    private Integer askingprice;
}
