package com.ssafy.anudar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private LocalDateTime start_time;

    @Column(name = "end_time")
    private LocalDateTime end_time;

    @Column(name = "video")
    private String video;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibition_id")
    private Exhibition exhibition;

    @Builder
    public Docent(LocalDateTime start_time, LocalDateTime end_time, Exhibition exhibition) {
        this.exhibition = exhibition;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}
