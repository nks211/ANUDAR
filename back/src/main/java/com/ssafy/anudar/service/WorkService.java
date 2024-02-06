package com.ssafy.anudar.service;



import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.*;
import com.ssafy.anudar.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkService {
    private final WorkRepository workRepository;
    private final ExhibitionRepository exhibitionRepository;
    private final LikeWorkRepository likeWorkRepository;
    private final UserRepository repository;
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
    }

    // 작품 찜 수 조회
    public Integer likeCount(Long work_id) {
        Work work = workRepository.findById(work_id)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.WORK_NOT_FOUND));
        return work.getBid();
    }

}
