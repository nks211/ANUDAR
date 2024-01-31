package com.ssafy.anudar.model;

import com.ssafy.anudar.service.UserService;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ExhibitionReview extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exhibition_review_id")
    private Long id;

    @Column(name= "content")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="exhibition_id")
    private Exhibition exhibition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;


//    대댓글인듯 :)
//    @ManyToOne
//    @JoinColumn(name = "exhibition_review")
//    private Exhibition exhibition_review;
}
