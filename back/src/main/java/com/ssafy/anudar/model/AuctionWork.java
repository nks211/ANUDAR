package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuctionWork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="auction_work_id")
    private Long id;

    @Column(name="final_price")
    private int finalPrice;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="work_id")
    private Work work;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @Builder
    public AuctionWork(Auction auction, Work work, User user, int finalPrice) {
        this.auction =auction;
        this.work = work;
        this.user = user;
        this.finalPrice = finalPrice;
    }

}
