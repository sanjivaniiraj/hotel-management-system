package com.hotel.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    @NotNull
    private Long roomId;

    @NotNull
    private LocalDate checkIn;

    @NotNull
    private LocalDate checkOut;

    @NotNull @Min(1)
    private Integer guests;
}
