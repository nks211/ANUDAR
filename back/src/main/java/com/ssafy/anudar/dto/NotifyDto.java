package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Notify;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotifyDto {

    private Long id;
    private String name;
    private String content;
    private Boolean isRead;
    private Notify.NotifyType notifyType;
    private String receiverName;

    public static NotifyDto fromEntity(Notify notify) {
        return new NotifyDto(
                notify.getId(),
                notify.getReceiver().getName(),
                notify.getContent(),
                notify.getIsRead(),
                notify.getNotifytype(),
                notify.getReceiver().getName()
        );
    }
}
