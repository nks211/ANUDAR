package com.ssafy.anudar.dto.request;

import com.ssafy.anudar.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExhibitionRegistRequest {

    String name;
    String detail;
    String start_time;
    String end_time;
    String docent_start;
    String docent_end;

}
