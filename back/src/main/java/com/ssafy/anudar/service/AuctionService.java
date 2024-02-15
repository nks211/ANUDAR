package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.SuccessWorkDto;
import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.dto.request.SuccessWorkRequset;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.model.SuccessWork;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import com.ssafy.anudar.repository.AuctionRepository;
import com.ssafy.anudar.repository.SuccessWorkRepository;
import com.ssafy.anudar.repository.UserRepository;
import com.ssafy.anudar.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuctionService {
    private final WorkRepository workRepository;
    private final UserRepository userRepository;
    private final AuctionRepository auctionRepository;
    private final SuccessWorkRepository successWorkRepository;
    @Transactional
    public SuccessWorkDto saveSuccessWork (Long workId, String nickname, Long auctionId, int finalPrice){
        Work work = workRepository.findById(workId)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.WORK_NOT_FOUND));
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.AUCTION_NOT_FOUND));
        // 낙찰 이력 저장
        SuccessWork successWork = new SuccessWork(auction, work, user, finalPrice);
        successWorkRepository.save(successWork);

        return SuccessWorkDto.fromEntity(successWork);
    }

    // 경매 할 작품을 가져오기
    public List<WorkDto> getWorks() {
        Optional<Auction> currentAuction = auctionRepository.findAuction(LocalDateTime.now());
        return currentAuction.map(auction -> workRepository.findTop20AuctionWorks(auction.getStart_time())
                .stream().map(WorkDto::fromEntity)
                .toList()).orElse(Collections.emptyList());
    }

    // 포인트 차감(닉칠 직픔 구매)
    public Long deductUserPoints(String username, SuccessWorkRequset successWorkRequset) {
        // 사용자 정보 조회
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        // 기존 포인트에 결제해야할 포인트 빼주기
        Long currentPoints = user.getUserPoints() != null ? user.getUserPoints() : 0L;
        Long updatedPoints = currentPoints - (successWorkRequset.getFinalPrice() / 10000);

        // 포인트 업데이트
        user.setUserPoints(updatedPoints);
        userRepository.save(user);

        return updatedPoints;
    }

}
