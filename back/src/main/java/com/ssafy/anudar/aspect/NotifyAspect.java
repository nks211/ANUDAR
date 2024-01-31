package com.ssafy.anudar.aspect;

import com.ssafy.anudar.service.NotifyService;
import org.aspectj.lang.annotation.Pointcut;

public class NotifyAspect {
    private final NotifyService notifyService;

    public NotifyAspect(NotifyService notifyService){
        this.notifyService = notifyService;
    }

    @Pointcut("@annotation(com.ssafy.anudar.aspect.notify.annotation.NeedNotify)")
    public void annotationPoincut(){

    }
}
