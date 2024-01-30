package com.ssafy.anudar.service;


import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.model.Work;
import com.ssafy.anudar.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkService {
    private final WorkRepository workRepository;

    public List<WorkDto> getWorksAll() {
        return workRepository.findAll().stream().map(WorkDto::fromEntity).collect(Collectors.toList());
    }

    public Optional<Work> getWorkById(Long work_id) {
        return workRepository.findById(work_id);
    }
}
