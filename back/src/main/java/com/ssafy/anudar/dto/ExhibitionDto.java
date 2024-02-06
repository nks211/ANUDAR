package com.ssafy.anudar.dto;

<<<<<<< HEAD
import com.ssafy.anudar.model.Docent;
import com.ssafy.anudar.model.Exhibition;
import lombok.AccessLevel;
=======
import com.ssafy.anudar.model.Exhibition;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
<<<<<<< HEAD
import java.util.List;
=======
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExhibitionDto {
<<<<<<< HEAD
    private String name;
    private String detail;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private Long user_id;
    private UserDto user;
=======
    private Long id;
    private String name;
    private String detail;
    private String image;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private String author;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b


    public static ExhibitionDto fromEntity (Exhibition exhibition) {
        return new ExhibitionDto(
<<<<<<< HEAD
                exhibition.getName(),
                exhibition.getDetail(),
                exhibition.getStart_time(),
                exhibition.getEnd_time(),
                exhibition.getUser().getId(),
                UserDto.fromEntity(exhibition.getUser())
=======
                exhibition.getId(),
                exhibition.getName(),
                exhibition.getDetail(),
                exhibition.getImage(),
                exhibition.getStart_time(),
                exhibition.getEnd_time(),
                exhibition.getUser().getUsername()
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
        );
    }

}
