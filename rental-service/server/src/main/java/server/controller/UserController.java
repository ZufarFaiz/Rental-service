package server.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class UserController {

    private final UserServiceImpl userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @Valid @ModelAttribute RegisterRequest request,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {

        UserResponse userResponse = userService.register(request, avatar);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("user", userResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping("/check")
    public ResponseEntity<UserResponse> checkAuth(@RequestAttribute("user") String userEmail) {
        return ResponseEntity.ok(userService.checkAuth(userEmail));
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Map<String,String>> logout(){
        userService.logout();

        return ResponseEntity.ok(Map.of("message","Logout completed"));
    }
}