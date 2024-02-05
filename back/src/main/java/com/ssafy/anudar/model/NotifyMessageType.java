package com.ssafy.anudar.model;

public enum NotifyMessageType {
    AUTION_NEW_REQUEST("새로운 경매가 시작합니다."),
    DOCENT_NEW_REQUEST("새로운 도슨트가 시작합니다."),
    REVIEW_NEW_REQUEST("새로운 방명록이 달렸습니다."),
    FOLLOW_NEW_REQUEST("새로운 팔로우가 있습니다.");
    private String message;

    NotifyMessageType(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return message;
    }
}