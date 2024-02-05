package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.request.ReviewRequest;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.ExhibitionReview;
import com.ssafy.anudar.model.Notify;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.repository.ExhibitionRepository;
import com.ssafy.anudar.repository.ExhibitionReviewRepository;
import com.ssafy.anudar.repository.NotifyRepository;
import com.ssafy.anudar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.ssafy.anudar.model.Notify.NotifyType.REVIEW;

@Service
public class ReviewService {

    private final UserRepository userRepository;
    private final ExhibitionReviewRepository reviewRepository;
    private final ExhibitionRepository exhibitionRepository;
    private final NotifyRepository notifyRepository;

    @Autowired
    public ReviewService(UserRepository userRepository, ExhibitionReviewRepository reviewRepository, ExhibitionRepository exhibitionRepository, NotifyRepository notifyRepository) {
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.exhibitionRepository = exhibitionRepository;
        this.notifyRepository = notifyRepository;
    }

    public ReviewRequest saveReview(String content, Exhibition exhibitionid, String userName) {
        // exhibitionId를 이용하여 전시회 정보를 가져오거나 적절한 처리를 수행

        // 현재 로그인한 사용자 정보를 가져옴
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        // 리뷰 생성
        ExhibitionReview review = new ExhibitionReview(content, exhibitionid, user);
        reviewRepository.save(review);

        // 알림 생성 및 보내기
        String notifyContent = user.getName() + "님이 방명록을 남기셨습니다.";
        Notify notify = new Notify(user, REVIEW, notifyContent, false);
        notifyRepository.save(notify);

        // 알림을 유저 엔티티의 알림 리스트에 추가
        user.getNotifies().add(notify);

        return ReviewRequest.fromEntity(review);
    }

    // 전시회 리뷰 전체 조회
    public List<ExhibitionReview> getAllExhibitionReviews(Long exhibition_id) {
        Optional<Exhibition> exhibition = exhibitionRepository.findById(exhibition_id);
        return reviewRepository.findAllByExhibition(exhibition);
    }
}
