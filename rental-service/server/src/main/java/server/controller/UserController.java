package server.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.model.dto.request.LoginRequest;
import server.model.dto.request.RegisterRequest;
import server.model.dto.response.AuthResponse;
import server.model.dto.response.UserResponse;
import server.service.impl.UserServiceImpl;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
@Tag(name = "Users", description = "Управление пользователями")
public class UserController {

    private final UserServiceImpl userService;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Регистрация нового пользователя",
            description = "Создает нового пользователя. Аватар опционален"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Пользователь успешно создан",
                    content = @Content(schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "400", description = "Ошибка валидации данных"),
            @ApiResponse(responseCode = "409", description = "Пользователь с таким email уже существует")
    })
    public ResponseEntity<Map<String, Object>> register(
            @Valid @ModelAttribute RegisterRequest request,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {

        UserResponse userResponse = userService.register(request, avatar);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("user", userResponse));
    }

    @PostMapping("/login")
    @Operation(
            summary = "Авторизация пользователя",
            description = "Вход в систему. Возвращает JWT токен и данные пользователя"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успешный вход",
                    content = @Content(schema = @Schema(implementation = AuthResponse.class))),
            @ApiResponse(responseCode = "401", description = "Неверный email или пароль")
    })
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping("/check")
    @Operation(
            summary = "Проверка авторизации",
            description = "Проверяет валидность JWT токена и возвращает данные пользователя"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Токен валидный",
                    content = @Content(schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "401", description = "Токен недействителен или отсутствует")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> checkAuth(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        String userEmail = authentication.getName();
        return ResponseEntity.ok(userService.checkAuth(userEmail));
    }

    @DeleteMapping("/logout")
    @Operation(
            summary = "Выход из системы",
            description = "Завершает сессию пользователя"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успешный выход",
                    content = @Content(examples = @ExampleObject(value = "{\"message\": \"Logout completed\"}")))
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Map<String,String>> logout(){
        userService.logout();
        return ResponseEntity.ok(Map.of("message","Logout completed"));
    }
}