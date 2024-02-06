package com.ssafy.anudar.dto;

<<<<<<< HEAD
import com.ssafy.anudar.model.User;
=======
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
import com.ssafy.anudar.model.Work;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class WorkDto {
<<<<<<< HEAD
    private String title;
    private String detail;
    private Integer price;
    private String image;

    public static WorkDto fromEntity (Work work) {
        return new WorkDto(
                work.getTitle(),
                work.getDetail(),
                work.getPrice(),
                work.getTitle()
=======
    private Long id;
    private String title;
    private String image;
    private String detail;
    private Integer price;
    private int bid;
    private String author;

    public static WorkDto fromEntity (Work work) {
        return new WorkDto(
                work.getId(),
                work.getTitle(),
                work.getImage(),
                work.getDetail(),
                work.getPrice(),
                work.getBid(),
                work.getUser().getUsername()
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
        );
    }
}
