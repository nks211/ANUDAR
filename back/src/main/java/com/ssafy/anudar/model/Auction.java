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
@NoArgsConstructor
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="auction_id")
    private Long id;

    @Column(name="start_time")
    private LocalDateTime start_time;

    @OneToMany(mappedBy = "auction", cascade = CascadeType.ALL)
    private List<SuccessWork> successWorks;

    @OneToOne
    @JoinColumn(name = "auction_id")
    private AuctionVideo auctionVideo;

    public void setAuctionVideo(AuctionVideo auctionVideo){
        this.auctionVideo = auctionVideo;
        auctionVideo.setAuction(this);
    }

}
