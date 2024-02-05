package com.ssafy.anudar.controller;


import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auction")
@RequiredArgsConstructor
public class AuctionController {

    private final AuctionService auctionService;

    @GetMapping("/works")
    public ResponseEntity<List<WorkDto>> getWorks() {
        return new ResponseEntity<>(auctionService.getWorks(), HttpStatus.OK);
    }

}
