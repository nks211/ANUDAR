package com.ssafy.anudar.dto.request;

import com.ssafy.anudar.model.ExhibitionReview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    private String content;
    private String user; // 댓글을 쓰는 유저의 이름

    public ReviewRequest(ExhibitionReview exhibitionReview){
        this.content = exhibitionReview.getContent();
        this.user = String.valueOf(exhibitionReview.getUser());
    }

    public static ReviewRequest fromEntity (ExhibitionReview reviewRequest) {
        return new ReviewRequest(
                reviewRequest.getContent(),
                reviewRequest.getUser().getName()
        );
    }
}
