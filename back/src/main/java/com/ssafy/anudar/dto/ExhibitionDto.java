package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Exhibition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExhibitionDto {
    private Long id;
    private String name;
    private String detail;
    private String image;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private String author;


    public static ExhibitionDto fromEntity (Exhibition exhibition) {
        return new ExhibitionDto(
                exhibition.getId(),
                exhibition.getName(),
                exhibition.getDetail(),
                exhibition.getImage(),
                exhibition.getStart_time(),
                exhibition.getEnd_time(),
                exhibition.getUser().getUsername()
        );
    }

}
