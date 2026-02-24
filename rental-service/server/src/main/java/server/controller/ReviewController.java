package server.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.model.dto.request.ReviewRequest;
import server.model.dto.response.ReviewResponse;
import server.service.impl.ReviewServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Validated
public class ReviewController {
    private final ReviewServiceImpl reviewService;

    @PostMapping("/add-review")
    public ResponseEntity<String> addReview(@Valid @RequestBody ReviewRequest request, @PathVariable Long offerId,
            @AuthenticationPrincipal UserDetails userDetails){
        return ResponseEntity.ok(reviewService.addReview(request,offerId,userDetails));
    }

    @GetMapping("/{offerId}")
    public ResponseEntity<List<ReviewResponse>> allReviews(@PathVariable Long offerId){
        return ResponseEntity.ok(reviewService.getAllReviews(offerId));
    }
}
