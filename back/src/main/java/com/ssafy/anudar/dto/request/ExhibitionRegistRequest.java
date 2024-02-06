package com.ssafy.anudar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExhibitionRegistRequest {

    // 전시회 정보
    String name;
    String detail;
    String start_time;
    String end_time;
    String image;

    // 도슨트 정보
    String docent_start;
    String docent_end;

    // 작품 정보
    List<WorkRegistRequest> works;

}
