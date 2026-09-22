package com.hotel.controller;

import com.hotel.model.BookingStatus;
import com.hotel.repository.*;
import com.hotel.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserRepository users;
    private final RoomRepository rooms;
    private final BookingRepository bookings;
    private final BookingService bookingService;

    public AdminController(UserRepository users, RoomRepository rooms,
                           BookingRepository bookings, BookingService bookingService) {
        this.users = users;
        this.rooms = rooms;
        this.bookings = bookings;
        this.bookingService = bookingService;
    }

    @GetMapping("/stats")
    public ResponseEntity<?> stats() {
        BigDecimal revenue = bookings.findAll().stream()
                .filter(b -> b.getStatus() != BookingStatus.CANCELLED)
                .map(b -> b.getTotalAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("users", users.count());
        data.put("rooms", rooms.count());
        data.put("bookings", bookings.count());
        data.put("revenue", revenue);
        data.put("availableRooms", rooms.findByStatus(com.hotel.model.RoomStatus.AVAILABLE).size());

        return ResponseEntity.ok(data);
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> bookings() {
        return ResponseEntity.ok(bookingService.all());
    }

    @GetMapping("/users")
    public ResponseEntity<?> users() {
        return ResponseEntity.ok(users.findAll().stream().map(u -> Map.of(
                "id", u.getId(),
                "name", u.getName(),
                "email", u.getEmail(),
                "role", u.getRole()
        )).toList());
    }
}
