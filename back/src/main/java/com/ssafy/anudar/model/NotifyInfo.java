package com.ssafy.anudar.model;

public interface NotifyInfo {
    User receiver();
    Long getGoUrlId();
    Notify.NotifyType getNotifyType();
}
