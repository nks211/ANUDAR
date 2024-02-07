package com.ssafy.anudar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="work_id")
    private Work work;

    @Builder
    public LikeWork(User user, Work work) {
        this.user = user;
        this.work = work;
    }
}
