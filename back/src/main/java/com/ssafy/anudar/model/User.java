package com.ssafy.anudar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Entity
@Getter @Setter
@Validated
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;

    @Column(name="name")
    private String name;

    @Column(name="nickname")
    private String nickname;
    
    @Column(name = "email")
    private String email;

    @Column(name = "image")
    private String image;

    @Column(name="phone")
    private String phone;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notify> notifies;

    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL)
    private List<Follow> followerList;

    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL)
    private List<Follow> followingList;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<LikeWork> likeWorks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Work> works;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Exhibition> exhibitions;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AuctionWork> acutionWorks;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<LikeExhibition> likeExhibitions;

    @Builder
    public User(String username, String password, String name, String nickname,
                String email, String image, String phone) {
        this.username=username;
        this.password=password;
        this.name=name;
        this.nickname=nickname;
        this.email=email;
        this.image=image;
        this.phone=phone;
    }

}
