package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.internal.CoreMessageLogger;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Docent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="docent_id")
    private Long id;

    @Column(name="start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "video")
    private String video;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibition_id")
    private Exhibition exhibition;

    @Builder
    public Docent(LocalDateTime startTime, LocalDateTime endTime,String video) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.video = video;
    }
}
