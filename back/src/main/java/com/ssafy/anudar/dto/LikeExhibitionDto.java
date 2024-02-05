package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.LikeExhibition;
import com.ssafy.anudar.model.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LikeExhibitionDto {
    private User user;
    private Exhibition exhibition;

    public static LikeExhibitionDto fromEntity(LikeExhibition likeExhibition){
        return new LikeExhibitionDto(
                likeExhibition.getUser(),
                likeExhibition.getExhibition()
        );
    }
}
