package com.hotel.controller;

import com.hotel.dto.BookingRequest;
import com.hotel.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(Authentication auth, @Valid @RequestBody BookingRequest request) {
        return ResponseEntity.ok(service.create(auth.getName(), request));
    }

    @GetMapping("/my")
    public ResponseEntity<?> my(Authentication auth) {
        return ResponseEntity.ok(service.myBookings(auth.getName()));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(Authentication auth, @PathVariable Long id) {
        return ResponseEntity.ok(service.cancel(id, auth.getName()));
    }
}
