package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="follow_id")
    private long id;


    @ManyToOne(fetch = FetchType.LAZY)  // default EAGER
    @JoinColumn(name = "to_user")
    private User toUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user")
    private User fromUser;

    public Follow(User toUser, User fromUser){
        this.toUser = toUser;
        this.fromUser = fromUser;
    }

    public Follow() {

    }
}
