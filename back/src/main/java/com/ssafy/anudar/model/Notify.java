package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notify extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="notify_id")
    private Long id;

    @Column(name="link")
    private String link;

    @Column(name="content")
    private String content;

    @Column(name="checked")
    private boolean checked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private NotifyType notifytype;

    public static Notify from(String link, String content, LocalDateTime created, boolean checked,  User user){
        Notify notify = new Notify();
        notify.link = link;
        notify.content = content;
        notify.checked = checked;
        notify.user = user;
        return notify;
    }

    // 알람 읽음
    public void read() {
        this.checked = true;
    }

}
