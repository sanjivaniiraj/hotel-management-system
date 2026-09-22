package com.hotel.repository;

import com.hotel.model.Room;
import com.hotel.model.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStatus(RoomStatus status);
    List<Room> findByRoomTypeContainingIgnoreCase(String type);
}
