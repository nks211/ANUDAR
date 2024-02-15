package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.SuccessWorkDto;
import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.dto.request.SuccessWorkRequset;

import com.ssafy.anudar.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(allowedHeaders = "*", originPatterns = "*")
@RestController
@RequestMapping("/auction")
@RequiredArgsConstructor
public class AuctionController {

    private final AuctionService auctionService;
    @PostMapping("/bidok")
    public ResponseEntity<SuccessWorkDto> bidok(@RequestBody SuccessWorkRequset req) {
        SuccessWorkDto successWorkDto = auctionService
                .saveSuccessWork(req.getWorkId(), req.getNickname(),
                        req.getAuctionId(), req.getFinalPrice());
        return new ResponseEntity<>(successWorkDto, HttpStatus.OK);
    }

    @GetMapping("/works")
    public ResponseEntity<List<WorkDto>> getWorks() {
        return new ResponseEntity<>(auctionService.getWorks(), HttpStatus.OK);
    }

}
