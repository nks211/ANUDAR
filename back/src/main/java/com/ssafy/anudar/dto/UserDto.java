package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Notify;
import com.ssafy.anudar.model.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;



@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserDto {
    private String username;
    private String name;
    private String nickname;
    private String email;
    private String image;
    private String phone;
    private List<Notify> notifies; // 알림 리스트 추가

    public static UserDto fromEntity (User user) {
        return new UserDto(
                user.getUsername(),
                user.getName(),
                user.getNickname(),
                user.getEmail(),
                user.getImage(),
                user.getPhone(),
                user.getNotifies()
        );
    }
}
