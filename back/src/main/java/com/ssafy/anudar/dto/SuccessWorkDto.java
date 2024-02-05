package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.model.SuccessWork;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SuccessWorkDto {
    private Long id;
    private int finalPrice;
    private Work work;
    private User user;
    private Auction auction;

    public static SuccessWorkDto fromEntity (SuccessWork successWork) {
        return new SuccessWorkDto(
                successWork.getId(),
                successWork.getFinalPrice(),
                successWork.getWork(),
                successWork.getUser(),
                successWork.getAuction()
        );
    }
}
