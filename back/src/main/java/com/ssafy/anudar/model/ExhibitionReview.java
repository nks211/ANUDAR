package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExhibitionReview extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exhibition_review_id")
    private Long id;

    @Column(name= "content")
    private String content;

    @ManyToOne
    @JoinColumn(name="exhibition_id")
    private Exhibition exhibition;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Builder
    public ExhibitionReview(String content, Exhibition exhibition, User user){
        this.content = content;
        this.exhibition = exhibition;
        this.user = user;
    }


//    대댓글인듯 :)
//    @ManyToOne
//    @JoinColumn(name = "exhibition_review")
//    private Exhibition exhibition_review;
}
