package com.hotel.config;

import com.hotel.model.Role;
import com.hotel.model.Room;
import com.hotel.model.RoomStatus;
import com.hotel.model.User;
import com.hotel.repository.RoomRepository;
import com.hotel.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seed(
            UserRepository users,
            RoomRepository rooms,
            PasswordEncoder encoder) {

        return args -> {

            if (!users.existsByEmail("admin@hotel.com")) {
                users.save(User.builder()
                        .name("Hotel Administrator")
                        .email("admin@hotel.com")
                        .password(encoder.encode("Admin@123"))
                        .role(Role.ADMIN)
                        .build());
            }

            if (rooms.count() == 0) {

                rooms.save(Room.builder()
                        .roomNumber("101")
                        .roomType("Deluxe")
                        .price(new BigDecimal("4500"))
                        .capacity(2)
                        .description("Elegant deluxe room with a king bed and city view.")
                        .imageUrl("https://images.unsplash.com/photo-1611892440504-42a792e24d32")
                        .status(RoomStatus.AVAILABLE)
                        .build());

                rooms.save(Room.builder()
                        .roomNumber("202")
                        .roomType("Premium")
                        .price(new BigDecimal("6500"))
                        .capacity(3)
                        .description("Premium room with spacious seating area and modern interiors.")
                        .imageUrl("https://images.unsplash.com/photo-1590490360182-c33d57733427")
                        .status(RoomStatus.AVAILABLE)
                        .build());

                rooms.save(Room.builder()
                        .roomNumber("301")
                        .roomType("Suite")
                        .price(new BigDecimal("9500"))
                        .capacity(4)
                        .description("Large suite designed for families and longer stays.")
                        .imageUrl("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b")
                        .status(RoomStatus.AVAILABLE)
                        .build());
            }
        };
    }
}
