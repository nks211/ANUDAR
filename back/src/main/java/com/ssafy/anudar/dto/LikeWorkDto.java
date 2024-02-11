package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.LikeWork;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LikeWorkDto {
    private User user;
    private Work work;

    public static LikeWorkDto fromEntity (LikeWork likework) {
        return new LikeWorkDto(
                likework.getUser(),
                likework.getWork()
        );
    }
}
