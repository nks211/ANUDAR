package com.ssafy.anudar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="work_id")
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="detail")
    private String detail;

    @Column(name="price")
    private Integer price;

    @Column(name="image")
    private String image;

    @Column(name="bid")
    private Integer bid;

    @OneToOne(mappedBy = "work", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private AuctionWork auctionWork;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "work", cascade = CascadeType.ALL)
    private List<LikeWork> likeWorks;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="exhibition_id")
    private Exhibition exhibition;

    @Builder
    public Work(String title, String detail, Integer price, String image, User user, Exhibition exhibition) {
        this.title = title;
        this.detail = detail;
        this.price = price;
        this.image = image;
        this.user = user;
        this.exhibition = exhibition;
        bid = 0;
    }

}