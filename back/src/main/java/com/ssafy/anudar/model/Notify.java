package com.ssafy.anudar.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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

    @Column(name="isRead")
    private Boolean isRead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User receiver;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotifyType notifytype;

    @Builder
    public  Notify (User receiver, NotifyType notifytype, String content, String link, Boolean isRead){
        this.receiver = receiver;
        this.notifytype = notifytype;
        this.content = content;
        this.link = link;
        this.isRead = isRead;
    }

    public enum NotifyType {
        AUTION,   // 경매 시작 알림
        DOCENT,   // 도슨트 시작 알림
        FOLLOW,  // 팔로우 알림
        REVIEW     // 댓글 작성
    }

}
