package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AuctionVideo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_video_id")
    private Long id;

    @OneToOne
    @JoinColumn(name="auction_id")
    private Auction auction;

    private String videoUrl;

    private LocalDateTime startTime; // 경매 시작 시간

    public void setCreationTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
}
