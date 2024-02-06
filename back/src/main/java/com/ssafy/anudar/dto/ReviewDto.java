package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.ExhibitionReview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Long id;
    private String content;
    private String user; // 댓글을 쓰는 유저의 이름
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ReviewDto fromEntity (ExhibitionReview review) {
        return new ReviewDto(
                review.getId(),
                review.getContent(),
                review.getUser().getName(),
                review.getCreatedAt(),
                review.getUpdatedAt()
        );
    }
}
