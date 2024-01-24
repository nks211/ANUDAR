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
public class Exhibition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="exhibition_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "detail")
    private String detail;

    @Column(name = "start_time")
    private LocalDateTime start_time;

    @Column(name = "end_time")
    private LocalDateTime end_time;

    @OneToMany(mappedBy = "exhibition", cascade = CascadeType.ALL)
    private List<LikeExhibition> likeExhibitions;

//    @ManyToOne
//    @JoinColumn(name = "exhibition_review_id")
//    private ExhibitionReview exhibition_review;


    @OneToMany(mappedBy = "exhibition", cascade = CascadeType.ALL)
    private List<ExhibitionReview> exhibitionReviews;

    @OneToOne(mappedBy = "exhibition")
    private Docent docent;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

}
