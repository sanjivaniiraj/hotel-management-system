package com.hotel.service;

import com.hotel.dto.RoomRequest;
import com.hotel.model.*;
import com.hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository rooms;

    public RoomService(RoomRepository rooms) {
        this.rooms = rooms;
    }

    public List<Room> all() {
        return rooms.findAll();
    }

    public Room create(RoomRequest r) {
        return rooms.save(Room.builder()
                .roomNumber(r.getRoomNumber())
                .roomType(r.getRoomType())
                .price(r.getPrice())
                .capacity(r.getCapacity())
                .description(r.getDescription())
                .imageUrl(r.getImageUrl())
                .status(RoomStatus.AVAILABLE)
                .build());
    }

    public Room update(Long id, RoomRequest r) {
        Room room = rooms.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
        room.setRoomNumber(r.getRoomNumber());
        room.setRoomType(r.getRoomType());
        room.setPrice(r.getPrice());
        room.setCapacity(r.getCapacity());
        room.setDescription(r.getDescription());
        room.setImageUrl(r.getImageUrl());
        return rooms.save(room);
    }

    public void delete(Long id) {
        rooms.deleteById(id);
    }
}
