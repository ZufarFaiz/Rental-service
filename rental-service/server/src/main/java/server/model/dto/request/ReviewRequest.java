package server.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@Schema(description = "Запрос на создание отзыва")
public class ReviewRequest {

    @Schema(description = "Текст отзыва", example = "Great place to stay! Very clean and comfortable.", required = true)
    @NotBlank
    @Size(min = 5, max = 120)
    private String text;

    @Schema(description = "Оценка (1-5)", example = "5", minimum = "1", maximum = "5")
    @NotNull
    @Min(value = 1)
    @Max(value = 5)
    private Integer rating;
}