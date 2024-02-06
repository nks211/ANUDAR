package com.ssafy.anudar.dto.request;

import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SuccessWorkRequset {
    int finalPrice;
    Long workId;
    Long userId;
    Long auctionId;
}
