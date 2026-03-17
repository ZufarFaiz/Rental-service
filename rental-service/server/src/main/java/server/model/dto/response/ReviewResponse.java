package server.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Информация об отзыве")
public class ReviewResponse {

    @Schema(description = "Информация о хосте")
    private Host host;

    @Schema(description = "Оценка", example = "5")
    private Integer rating;

    @Schema(description = "Дата публикации", example = "2024-01-15T10:30:00")
    private LocalDateTime publishDate;

    @Schema(description = "Текст отзыва", example = "Great place to stay!")
    private String text;
}