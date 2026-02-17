package server.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.exception.BadRequestException;
import server.model.dto.request.RegisterRequest;
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

    public UserResponse register(RegisterRequest request, MultipartFile avatar) {
        if (request.getEmail() == null || request.getEmail().isBlank() ||
                request.getPassword() == null || request.getPassword().isBlank()) {
            throw new BadRequestException("Некорректный email или password");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Пользователь с таким email уже существует");
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
}
