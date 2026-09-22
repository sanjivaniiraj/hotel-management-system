package com.hotel.service;

import com.hotel.dto.BookingRequest;
import com.hotel.model.*;
import com.hotel.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookings;
    private final RoomRepository rooms;
    private final UserRepository users;

    public BookingService(BookingRepository bookings, RoomRepository rooms, UserRepository users) {
        this.bookings = bookings;
        this.rooms = rooms;
        this.users = users;
    }

    public Booking create(String email, BookingRequest request) {
        if (!request.getCheckOut().isAfter(request.getCheckIn())) {
            throw new RuntimeException("Check-out must be after check-in");
        }

        User user = users.findByEmail(email).orElseThrow();
        Room room = rooms.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (request.getGuests() > room.getCapacity()) {
            throw new RuntimeException("Guest count exceeds room capacity");
        }

        if (bookings.existsOverlappingBooking(
                room.getId(), request.getCheckIn(), request.getCheckOut())) {
            throw new RuntimeException("Room is already booked for these dates");
        }

        long nights = ChronoUnit.DAYS.between(request.getCheckIn(), request.getCheckOut());
        BigDecimal total = room.getPrice().multiply(BigDecimal.valueOf(nights));

        return bookings.save(Booking.builder()
                .user(user)
                .room(room)
                .checkIn(request.getCheckIn())
                .checkOut(request.getCheckOut())
                .guests(request.getGuests())
                .totalAmount(total)
                .status(BookingStatus.CONFIRMED)
                .build());
    }

    public List<Booking> myBookings(String email) {
        User user = users.findByEmail(email).orElseThrow();
        return bookings.findByUserIdOrderByCheckInDesc(user.getId());
    }

    public Booking cancel(Long id, String email) {
        Booking booking = bookings.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Not allowed");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        return bookings.save(booking);
    }

    public List<Booking> all() {
        return bookings.findAllByOrderByCheckInDesc();
    }
}
