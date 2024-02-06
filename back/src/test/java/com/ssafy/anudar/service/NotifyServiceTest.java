//package com.ssafy.anudar.service;
//
//import com.ssafy.anudar.model.Notify;
//import com.ssafy.anudar.model.Notifytype;
//import com.ssafy.anudar.model.User;
//import com.ssafy.anudar.repository.NotifyRepository;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//public class NotifyServiceTest {
//
//    @Mock
//    private NotifyRepository notifyRepository;
//
//    @InjectMocks
//    private NotifyService notifyService;
//
//    @Test
//    public void testCreateNotification() {
//        User user = new User(); // 적절한 사용자 객체 생성
//        String link = "https://example.com";
//        Notifytype notifytype = Notifytype.AUTION_CREATED;
//``
//        notifyService.createdNotifications(user, notifytype, link);
//
//        // save 메서드가 1번 호출되었는지 검증
//        verify(notifyRepository, times(1)).save(any(Notify.class));
//    }
//
//    @Test
//    public void testGetUnreadNotifications() {
//        User user = new User(); // 적절한 사용자 객체 생성
//        List<Notify> mockNotifications = new ArrayList<>();
//        mockNotifications.add(new Notify());
//        mockNotifications.add(new Notify());
//
//        // 사용자의 읽지 않은 알림을 목업 데이터로 설정
//        when(notifyRepository.findByUserAndChecked(user, false)).thenReturn(mockNotifications);
//
//        List<Notify> result = notifyService.getUnreadNotifications(user);
//
//        // 반환된 알림 목록과 목업 데이터가 동일한지 검증
//        assertThat(result).isEqualTo(mockNotifications);
//    }
//
//    @Test
//    public void testMarkNotificationAsRead() {
//        Long notificationId = 1L;
//        Notify mockNotify = new Notify();
//
//        // findById 메서드가 목업 데이터를 반환하도록 설정
//        when(notifyRepository.findById(notificationId)).thenReturn(java.util.Optional.of(mockNotify));
//
//        notifyService.markNotificationAsRead(notificationId);
//
//        // read 메서드가 1번 호출되었는지 검증
//        verify(mockNotify, times(1)).read();
//    }
//
//    @Test
//    public void testDeleteNotification() {
//        Long notificationId = 1L;
//
//        notifyService.deleteNotification(notificationId);
//
//        // deleteById 메서드가 1번 호출되었는지 검증
//        verify(notifyRepository, times(1)).deleteById(notificationId);
//    }
//}