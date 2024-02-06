package com.ssafy.anudar.service;



<<<<<<< HEAD
=======
import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
import com.ssafy.anudar.model.*;
import com.ssafy.anudar.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
<<<<<<< HEAD
=======
import org.springframework.transaction.annotation.Transactional;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkService {
    private final WorkRepository workRepository;
    private final ExhibitionRepository exhibitionRepository;
    private final LikeWorkRepository likeWorkRepository;
    private final UserRepository repository;
<<<<<<< HEAD
    private final AuctionWorkRepository auctionWorkRepository;

    // 전체 작품 조회
    public List<Work> getAllWorks() {
        return workRepository.findAll();
    }

    // 작품 상세 조회
    public Optional<Work> getWorkById(Long work_id) {
        return workRepository.findById(work_id);
    }

    // 작가 작품 조회
    public List<Work> getWorkByUser(Long user_id) {
        Optional<User> user = repository.findById(user_id);
        return workRepository.findAllByUser(user);
    }

    // 전시 작품 조회
    public List<Work> getWorkByExhibition(Long exhibition_id) {
        Optional<Exhibition> exhibition = exhibitionRepository.findById(exhibition_id);
        return workRepository.findAllByExhibition(exhibition);
    }

    // 작품 찜하기
    public String likeWork(String username, Long work_id) {
        // 작품의 작가인지 체크 후 => 작가, work_id로 검색시 존재하는지 체크
        // 작가 본인인지 체크 work.getUser().getUsername().equals(username)
        // 아니라면 LikeWork에 존재하는지 체크
        Work work = workRepository.findById(work_id).orElse(null);
        User user = repository.findByUsername(username).orElse(null);
        if (work != null && user != null && !work.getUser().getUsername().equals(username)) {
            // 없다면 생성해주기
            likeWorkRepository.findByUserAndWork(user, work)
                    .orElseGet(() -> {
                        LikeWork likeWork = new LikeWork(user, work);
                        likeWorkRepository.save(likeWork);
                        // 찜 수 증가
                        work.setBid(work.getBid() + 1);
                        workRepository.save(work);
                        return null;
                    });

        }
        return "좋아요";
    }

    // 작품 찜하기 취소
    public String unlikeWork(String username, Long work_id) {
        // 작품의 작가인지 체크 후 => 작가, work_id로 검색시 존재하는지 체크
        // 작가 본인인지 체크 work.getUser().getUsername().equals(username)
        // 아니라면 LikeWork에 존재하는지 체크
        Work work = workRepository.findById(work_id).orElse(null);
        User user = repository.findByUsername(username).orElse(null);
        if (work != null && user != null && !work.getUser().getUsername().equals(username)) {
            // 존재한다면 삭제해주기
            likeWorkRepository.findByUserAndWork(user, work)
                    .ifPresent(it -> {
                        likeWorkRepository.delete(it);
                        // 찜 수 감소
                        work.setBid(work.getBid() - 1);
                        workRepository.save(work);
                    });
        }
        return "좋아요 취소";
=======
    private final SuccessWorkRepository successWorkRepository;

    // 전체 작품 조회
    public List<WorkDto> getAllWorks() {
        return workRepository.findAll()
                .stream().map(WorkDto::fromEntity).toList();
    }

    // 작품 상세 조회
    public WorkDto getWorkById(Long work_id) {
        Work work = workRepository.findById(work_id)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.WORK_NOT_FOUND));
        return WorkDto.fromEntity(work);
    }

    // 작가 작품 조회
    public List<WorkDto> getWorkByUser(Long user_id) {
        User user = repository.findById(user_id)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        return workRepository.findAllByUser(user)
                .stream().map(WorkDto::fromEntity).toList();
    }

    // 전시 작품 조회
    public List<WorkDto> getWorkByExhibition(Long exhibition_id) {
        Exhibition exhibition = exhibitionRepository.findById(exhibition_id)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.WORK_NOT_FOUND));
        return workRepository.findAllByExhibition(exhibition)
                .stream().map(WorkDto::fromEntity).toList();
    }

    // 작품 찜하기/취소
    @Transactional
    public void likeWork(String username, Long work_id) {
        Work work = workRepository.findById(work_id)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.WORK_NOT_FOUND));
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        Optional<LikeWork> likeWork = likeWorkRepository.findByUserAndWork(user, work);

        if (likeWork.isPresent()) { // 좋아요가 이미 존재 -> 좋아요 취소
            work.setBid(work.getBid()-1);
            likeWorkRepository.delete(likeWork.get());
        } else { // 좋아요가 없음 -> 생성
            work.setBid(work.getBid()+1);
            likeWorkRepository.save(new LikeWork(user, work));
        }
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    }

    // 작품 찜 수 조회
    public Integer likeCount(Long work_id) {
<<<<<<< HEAD
        return workRepository.findById(work_id).get().getBid();
    }
=======
        Work work = workRepository.findById(work_id)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.WORK_NOT_FOUND));
        return work.getBid();
    }

>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
}
