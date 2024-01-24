package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private int price;

    @Column(name="final_price")
    private int final_price;

    @Column(name="image")
    private String image;

    @Column(name="bid")
    private int bid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="auction_id")
    private Auction auction;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @OneToMany(mappedBy = "work", cascade = CascadeType.ALL)
    private List<LikeWork> likeWorks;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="exhibition_id")
    private Exhibition exhibition;

}
