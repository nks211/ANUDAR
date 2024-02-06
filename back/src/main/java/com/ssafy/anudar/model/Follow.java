package com.ssafy.anudar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="follow_id")
    private long id;

<<<<<<< HEAD
    @JsonIgnore
=======
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    @ManyToOne(fetch = FetchType.LAZY)  // default EAGER
    @JoinColumn(name = "to_user")
    private User toUser;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user")
    private User fromUser;

    @Builder
    public Follow(User toUser, User fromUser){
        this.toUser = toUser;
        this.fromUser = fromUser;
    }

}
