package com.ssafy.anudar.service;


import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.Work;
import com.ssafy.anudar.repository.LikeWorkRepository;
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

    // 전체 작품 조회
    public List<WorkDto> getWorksAll() {
        return workRepository.findAll().stream().map(WorkDto::fromEntity).collect(Collectors.toList());
    }

    public String likeWork(String username, Long work_id) {
        System.out.println(username);
        // 작춤의 작가인지 체크 후 => 작가, work_id로 검색시 존재하는지 체
        // 작가 본인인지 체크 work.getUser().getUsername().equals(username)
        // 아니라면 LikeWork에 존재하는지 체크
        Work work = workRepository.findById(work_id).get();
        if (!work.getUser().getUsername().equals(username)) {
            System.out.println("if문 통과");
            likeWorkRepository.findByUserAndWork(work.getUser(), work);
//                    .orElse("pass");
        }
        return "해보고잇슴니당";
    }
}
