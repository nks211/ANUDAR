package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "exhibition", cascade = CascadeType.ALL)
    private List<Work> works;

    @OneToMany(mappedBy = "exhibition", cascade = CascadeType.ALL)
    private List<LikeExhibition> likeExhibitions;

    @OneToMany(mappedBy = "exhibition", cascade = CascadeType.ALL)
    private List<ExhibitionReview> exhibitionReviews;

    @OneToOne(mappedBy = "exhibition", fetch = FetchType.LAZY)
    private Docent docent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Exhibition(String name, String detail, LocalDateTime start_time, LocalDateTime end_time, String image, User user) {
        this.name = name;
        this.detail = detail;
        this.start_time = start_time;
        this.end_time = end_time;
        this.image = image;
        this.user = user;
    }

}