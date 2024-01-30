package com.ssafy.anudar.service;



import com.ssafy.anudar.dto.LikeWorkDto;
import com.ssafy.anudar.dto.UserDto;
import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.LikeWork;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import com.ssafy.anudar.repository.LikeWorkRepository;
import com.ssafy.anudar.repository.UserRepository;
import com.ssafy.anudar.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkService {
    private final WorkRepository workRepository;
    private final LikeWorkRepository likeWorkRepository;
    private final UserRepository repository;

    // 전체 작품 조회
    public List<WorkDto> getWorksAll() {
        return workRepository.findAll().stream().map(WorkDto::fromEntity).collect(Collectors.toList());
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
                        work.setBid(work.getBid() - 1);
                        workRepository.save(work);
                    });

        }
        return "좋아요 취소";
    }

    // 작품 찜 수 조회
    public Integer likeCount(Long work_id) {
        return workRepository.findById(work_id).get().getBid();
    }
}
