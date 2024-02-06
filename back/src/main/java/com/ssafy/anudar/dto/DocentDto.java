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
<<<<<<< HEAD
    private long exhibition_id;
=======
    private String video;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b

    public static DocentDto fromEntity (Docent docent) {
        return new DocentDto(
                docent.getStart_time(),
                docent.getEnd_time(),
<<<<<<< HEAD
                docent.getExhibition().getId()
=======
                docent.getVideo()
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
        );
    }
}