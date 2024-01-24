package com.ssafy.anudar.model;

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
public class ExhibitionReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exhibition_review_id")
    private Long exhibitionReviewId;

    @Column(name= "content")
    private String content;

    @Column(name = "created_time")
    private LocalDateTime created_time;

    @Column(name = "modified_time")
    private LocalDateTime start_time;

    @ManyToOne
    @JoinColumn(name="exhibition_id")
    private Exhibition exhibition;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

//    @OneToMany(mappedBy = "exhibition_review", cascade = CascadeType.ALL)
//    private List<Exhibition> exhibitionReviews;
    @ManyToOne
    @JoinColumn(name = "parent_review_id")
    private ExhibitionReview exhibition_review;
}
