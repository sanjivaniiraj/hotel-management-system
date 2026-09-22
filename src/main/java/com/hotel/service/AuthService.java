package com.hotel.service;

import com.hotel.dto.*;
import com.hotel.model.*;
import com.hotel.repository.UserRepository;
import com.hotel.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public Object signup(SignupRequest request) {
        if (users.existsByEmail(request.getEmail().toLowerCase())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail().toLowerCase())
                .password(encoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        users.save(user);
        return loginInternal(user);
    }

    public Object login(LoginRequest request) {
        User user = users.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return loginInternal(user);
    }

    private AuthResponse loginInternal(User user) {
        return new AuthResponse(
                jwt.generate(user.getEmail(), user.getRole().name()),
                user.getId(), user.getName(), user.getEmail(), user.getRole().name()
        );
    }

    public record AuthResponse(String token, Long id, String name, String email, String role) {}
}
