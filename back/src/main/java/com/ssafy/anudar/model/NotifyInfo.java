package com.ssafy.anudar.model;

public interface NotifyInfo {
    User receicer();
    Long getGoUrlId();
    Notify.NotifyType getNotifyType();
}
