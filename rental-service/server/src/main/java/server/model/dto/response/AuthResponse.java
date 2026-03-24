package server.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Ответ с JWT токеном")
public class AuthResponse {

    @Schema(description = "JWT токен для авторизации",
            example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;

    @Schema(description = "Email", example = "user@example.com")
    private String email;

    @Schema(description = "URL аватара", example = "/static/avatar.jpg")
    private String avatarUrl;
}