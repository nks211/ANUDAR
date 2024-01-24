package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @OneToOne
    @JoinColumn(name = "exhibition_id")
    private Exhibition exhibition;


}
