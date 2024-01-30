package com.ssafy.anudar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeExhibition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="like_exhibition_id")
    private Long id;

    // LAZY -> EAGER 원래는 LAZY를 쓰는것을 지향 , 연관된게 많아서 다 가져와야 할때는 EAGER 쓰는걸로...
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id")
//    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibition_id")
    @JsonIgnore
    private Exhibition exhibition;

    @Builder
    public LikeExhibition(User user, Exhibition exhibition){
        this.user = user;
        this.exhibition = exhibition;
    }
}
