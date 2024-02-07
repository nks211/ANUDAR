package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Notify;
import com.ssafy.anudar.model.NotifyMessageType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class NotifyDto {
    public static class Response{
        private String id;
        private String name;
        private String content;
        private String type;
        private String createdAt;
        private NotifyMessageType messageType;

        @Builder
        public Response(String id, String name, String content, String type, String createdAt) {
            this.id = id;
            this.name = name;
            this.content = content;
            this.type = type;
            this.createdAt = createdAt;
        }

        public static Response createResponse(Notify notify){
            return Response.builder()
                    .content(notify.getContent())
                    .id(notify.getId().toString())
                    .name(notify.getReceiver().getName())
                    .createdAt(notify.getCreatedAt().toString())
                    .build();
        }
    }
}
