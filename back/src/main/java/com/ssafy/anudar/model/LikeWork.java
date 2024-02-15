package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeWork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="like_work_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="work_id")
    private Work work;

    @Builder
    public LikeWork(User user, Work work) {
        this.user = user;
        this.work = work;
    }
}
