package server.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
@Tag(name = "Reviews", description = "Управление отзывами")
public class ReviewController {

    private final ReviewServiceImpl reviewService;

    @PostMapping("/{offerId}/add-review")
    @Operation(
            summary = "Добавить отзыв",
            description = "Добавляет новый отзыв к предложению. Только для авторизованных пользователей"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Отзыв успешно добавлен",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Ошибка валидации"),
            @ApiResponse(responseCode = "401", description = "Не авторизован"),
            @ApiResponse(responseCode = "404", description = "Предложение не найдено")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> addReview(
            @Valid @RequestBody ReviewRequest request,
            @PathVariable Long offerId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(reviewService.addReview(request, offerId, userDetails));
    }

    @GetMapping("/{offerId}")
    @Operation(
            summary = "Получить все отзывы",
            description = "Возвращает список всех отзывов для указанного предложения"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список отзывов",
                    content = @Content(schema = @Schema(implementation = ReviewResponse.class))),
            @ApiResponse(responseCode = "404", description = "Предложение не найдено")
    })
    public ResponseEntity<List<ReviewResponse>> getAllReviews(@PathVariable Long offerId) {
        return ResponseEntity.ok(reviewService.getAllReviews(offerId));
    }
}