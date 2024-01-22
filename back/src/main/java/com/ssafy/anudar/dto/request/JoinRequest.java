package com.ssafy.anudar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class JoinRequest {

    String username;
    String password;
    String name;
    String nickname;
    String email;
    String image;
    String phone;

}
