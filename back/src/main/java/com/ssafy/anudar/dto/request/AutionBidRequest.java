package com.ssafy.anudar.dto.request;

import com.ssafy.anudar.model.Work;
import lombok.Data;

@Data
public class AutionBidRequest {
    private Integer channelId;
    private String username;
    private Work work;
    private Integer askingprice;
}
