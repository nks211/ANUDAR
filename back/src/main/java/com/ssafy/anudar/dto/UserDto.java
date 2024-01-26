package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserDto {
    private String username;
    private String password;
    private String name;
    private String nickname;
    private String email;
    private String image;
    private String phone;

    public static UserDto fromEntity (User user) {
        return new UserDto(
                user.getUsername(),
                user.getPassword(),
                user.getName(),
                user.getNickname(),
                user.getEmail(),
                user.getImage(),
                user.getPhone()
        );
    }
}
