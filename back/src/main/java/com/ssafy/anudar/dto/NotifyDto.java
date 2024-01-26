package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Notifytype;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NotifyDto {
    private Long id;
    private String link;
    private String content;
    private boolean checked;
    private LocalDateTime created;
    private Notifytype notifytype;

    public void NotifyDTO(Long id, String link, String content, boolean checked, LocalDateTime created, Notifytype notifytype) {
        this.id = id;
        this.link = link;
        this.content = content;
        this.checked = checked;
        this.created = created;
        this.notifytype = notifytype;
    }
}
