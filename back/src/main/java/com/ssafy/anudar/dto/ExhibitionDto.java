package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Exhibition;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ExhibitionDto {
    private String name;
    private String detail;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private Long user_id;

    public static ExhibitionDto fromEntity (Exhibition exhibition) {
        return new ExhibitionDto(
                exhibition.getName(),
                exhibition.getDetail(),
                exhibition.getStart_time(),
                exhibition.getEnd_time(),
                exhibition.getUser().getId()
        );
    }
}
