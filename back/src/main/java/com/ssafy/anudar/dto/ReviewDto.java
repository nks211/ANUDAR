package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.ExhibitionReview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

<<<<<<< HEAD
=======
import java.time.LocalDateTime;

>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Long id;
    private String content;
    private String user; // 댓글을 쓰는 유저의 이름
<<<<<<< HEAD
=======
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b

    public static ReviewDto fromEntity (ExhibitionReview review) {
        return new ReviewDto(
                review.getId(),
                review.getContent(),
<<<<<<< HEAD
                review.getUser().getName()
=======
                review.getUser().getName(),
                review.getCreatedAt(),
                review.getUpdatedAt()
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
        );
    }
}
