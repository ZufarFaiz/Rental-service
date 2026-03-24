package server.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.exception.BadRequestException;
import server.exception.NotFoundException;
import server.model.dto.request.LoginRequest;
import server.model.dto.request.RegisterRequest;
import server.model.dto.response.AuthResponse;
import server.model.dto.response.UserResponse;
import server.model.entity.User;
import server.model.enums.UserType;
import server.repository.UserRepository;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageServiceImpl fileStorageService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public UserResponse register(RegisterRequest request, MultipartFile avatar) {
        if (request.getEmail() == null || request.getEmail().isBlank() ||
                request.getPassword() == null || request.getPassword().isBlank()) {
            throw new BadRequestException("Некорректный email или password");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Пользователь с таким email уже существует");
        }

        String avatarFileName = null;
        if (avatar != null && !avatar.isEmpty()) {
            avatarFileName = fileStorageService.storeFile(avatar);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setUserType(request.getUserType());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAvatar(avatarFileName);
        User savedUser = userRepository.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .username(savedUser.getUsername())
                .avatar(savedUser.getAvatar() != null ?
                        "/static/" + savedUser.getAvatar() : null)
                .isPro(savedUser.getUserType() == UserType.PRO)
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("Пользователь не найден"));

        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .avatarUrl(user.getAvatar())
                .build();
    }

    public UserResponse checkAuth(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("Пользователь не найден"));

        String token = jwtService.generateToken(user);

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .isPro(user.getUserType() == server.model.enums.UserType.PRO)
                .token(token)
                .build();
    }

    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
