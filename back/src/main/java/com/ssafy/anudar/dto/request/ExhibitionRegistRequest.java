package com.ssafy.anudar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
