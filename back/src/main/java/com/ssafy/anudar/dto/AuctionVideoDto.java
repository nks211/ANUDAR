package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.AuctionVideo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionVideoDto {

    private Long id;
    private String videoUrl;

    public static AuctionVideoDto fromEntity(AuctionVideo auctionVideo){
        return new AuctionVideoDto(
                auctionVideo.getId(),
                auctionVideo.getVideoUrl()
        );
    }

//    public void setId(Long id) {
//        this.id = id;
//    }
}
