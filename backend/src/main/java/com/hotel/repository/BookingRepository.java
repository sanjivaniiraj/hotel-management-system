package com.hotel.repository;

import com.hotel.model.*;
import org.springframework.data.jpa.repository.*;
import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserIdOrderByCheckInDesc(Long userId);
    List<Booking> findAllByOrderByCheckInDesc();

    @Query("""
        SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END
        FROM Booking b
        WHERE b.room.id = :roomId
          AND b.status = com.hotel.model.BookingStatus.CONFIRMED
          AND b.checkIn < :checkOut
          AND b.checkOut > :checkIn
    """)
    boolean existsOverlappingBooking(Long roomId, LocalDate checkIn, LocalDate checkOut);
}
