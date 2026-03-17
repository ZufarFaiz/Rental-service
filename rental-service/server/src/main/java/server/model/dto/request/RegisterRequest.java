package server.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import server.model.enums.UserType;

@Data
@Schema(description = "Запрос на регистрацию нового пользователя")
public class RegisterRequest {

    @Schema(description = "Email пользователя", example = "user@example.com", required = true)
    @NotBlank
    @Email
    private String email;

    @Schema(description = "Пароль (минимум 6 символов)", example = "password123", required = true)
    @NotBlank
    @Size(min = 6)
    private String password;

    @Schema(description = "Имя пользователя", example = "john_doe", required = true)
    @NotBlank
    private String username;

    @Schema(description = "Тип пользователя", example = "NORMAL", defaultValue = "NORMAL")
    @NotNull
    private UserType userType = UserType.NORMAL;
}