package com.hotel.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RoomRequest {
    @NotBlank
    private String roomNumber;

    @NotBlank
    private String roomType;

    @NotNull @Positive
    private BigDecimal price;

    @NotNull @Min(1)
    private Integer capacity;

    private String description;
    private String imageUrl;
}
