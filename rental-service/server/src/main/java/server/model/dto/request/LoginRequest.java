package server.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "Запрос на авторизацию")
public class LoginRequest {

    @Schema(description = "Email пользователя", example = "user@example.com", required = true)
    @NotBlank(message = "Email обязателен")
    @Email(message = "Некорректный формат email")
    private String email;

    @Schema(description = "Пароль", example = "password123", required = true)
    @NotBlank(message = "Пароль обязателен")
    private String password;
}