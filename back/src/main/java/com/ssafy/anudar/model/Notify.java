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
public class Notify {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="notify_id")
    private Long id;

    @Column(name="type")
    private String type;

    @Column(name="content")
    private String content;

    @Column(name="is_read")
    private boolean is_read;

    @Column(name="created_time")
    private LocalDateTime created_time = LocalDateTime.now();

    @Column(name="start_time")
    private LocalDateTime start_time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;
}
