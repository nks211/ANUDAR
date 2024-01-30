package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Docent;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class DocentDto {
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private long exhibition_id;

    public static DocentDto fromEntity (Docent docent) {
        return new DocentDto(
                docent.getStart_time(),
                docent.getEnd_time(),
                docent.getExhibition().getId()
        );
    }
}