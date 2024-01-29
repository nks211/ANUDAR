package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class WorkDto {
    private String title;
    private String detail;
    private Integer price;
    private String image;
    private User user;

    public static WorkDto fromEntity (Work work) {
        return new WorkDto(
                work.getTitle(),
                work.getDetail(),
                work.getPrice(),
                work.getTitle(),
                work.getUser()
        );
    }
}
