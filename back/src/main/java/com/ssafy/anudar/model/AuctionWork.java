package com.ssafy.anudar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_id")
    private Auction auction;

}
