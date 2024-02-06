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
<<<<<<< HEAD
    private Integer bid;
=======
    private Integer bid = 0;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b

    @JsonIgnore
    @OneToOne(mappedBy = "work", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private SuccessWork successWork;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

<<<<<<< HEAD
    @OneToMany(mappedBy = "work", cascade = CascadeType.ALL)
    private List<LikeWork> likeWorks;

    @JsonIgnore
=======
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="exhibition_id")
    private Exhibition exhibition;

<<<<<<< HEAD
=======
    @OneToMany(mappedBy = "work", cascade = CascadeType.ALL)
    private List<LikeWork> likeWorks;

>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    @Builder
    public Work(String title, String detail, Integer price, String image, User user, Exhibition exhibition) {
        this.title = title;
        this.detail = detail;
        this.price = price;
        this.image = image;
        this.user = user;
        this.exhibition = exhibition;
<<<<<<< HEAD
        bid = 0;
=======
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    }

}
