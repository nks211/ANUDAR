package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Work;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class AuctionBidDto {
    private String sessionId;
    private String nickname;
//    private Work work;
    private Integer askingprice;
}
