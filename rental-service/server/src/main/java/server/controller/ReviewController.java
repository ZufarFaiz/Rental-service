package server.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.model.dto.request.ReviewRequest;
import server.service.impl.ReviewServiceImpl;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Validated
public class ReviewController {
    private final ReviewServiceImpl reviewService;

    @PostMapping("/add-review")
    public ResponseEntity<String> addReview(@Valid @RequestBody ReviewRequest request){
        return ResponseEntity.ok(reviewService.addReview(request));
    }
}
