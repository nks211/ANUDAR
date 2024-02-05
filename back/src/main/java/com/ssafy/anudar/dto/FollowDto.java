package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Follow;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowDto {
    private String toUser;
    private String fromUser;

    public static FollowDto fromEntity (Follow follow) {
        return new FollowDto(
                follow.getToUser().getUsername(),
                follow.getFromUser().getUsername()
        );
    }
}
