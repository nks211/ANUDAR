package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="auction_id")
    private Long id;

    @Column(name="start_time")
    private LocalDateTime start_time;

    @OneToMany(mappedBy = "auction")
    private List<Work> works;

    @OneToMany(mappedBy = "auction", cascade = CascadeType.ALL)
    private List<SuccessWork> successWorks;

}
