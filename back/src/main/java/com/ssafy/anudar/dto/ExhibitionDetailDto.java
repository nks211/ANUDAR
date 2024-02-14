package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Exhibition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExhibitionDetailDto {

    private Long id;
    private String name;
    private String detail;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private String image;
    private UserDto author;
    private DocentDto docent;
    private List<WorkDto> workList;

    public static ExhibitionDetailDto fromEntity (Exhibition exhibition) {
        return new ExhibitionDetailDto(
                exhibition.getId(),
                exhibition.getName(),
                exhibition.getDetail(),
                exhibition.getStart_time(),
                exhibition.getEnd_time(),
                exhibition.getImage(),
                UserDto.fromEntity(exhibition.getUser()),
                DocentDto.fromEntity(exhibition.getDocent()),
                exhibition.getWorks().stream().map(WorkDto::fromEntity).collect(Collectors.toList())
        );
    }

}
