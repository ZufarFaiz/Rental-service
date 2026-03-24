package server.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.enums.UserType;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Информация о пользователе")
public class UserResponse {

    @Schema(description = "ID пользователя", example = "1")
    private Long id;

    @Schema(description = "Имя пользователя", example = "john_doe")
    private String username;

    @Schema(description = "Email", example = "user@example.com")
    private String email;

    @Schema(description = "Тип пользователя", example = "NORMAL")
    private UserType userType;

    @Schema(description = "URL аватара", example = "/static/avatar.jpg")
    private String avatarUrl;

    @Schema(description = "Дата создания", example = "2024-01-01T00:00:00")
    private LocalDateTime createdAt;

    @Schema(description = "Дата обновления", example = "2024-01-15T10:30:00")
    private LocalDateTime updatedAt;

    @Schema(description = "Pro статус", example = "true")
    private boolean isPro;

    @Schema(description = "JWT токен", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;

    @Schema(description = "Количество предложений", example = "5")
    private Integer offersCount;

    @Schema(description = "Количество отзывов", example = "10")
    private Integer reviewsCount;
}