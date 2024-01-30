package com.ssafy.anudar.dto.request;

import com.ssafy.anudar.model.Work;
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

    // 도슨트 정보
    String docent_start;
    String docent_end;

    // 작품 정보
    List<String> works_title;
    List<String> works_detail;
    List<Integer> works_price;
    List<String> works_image;

}
