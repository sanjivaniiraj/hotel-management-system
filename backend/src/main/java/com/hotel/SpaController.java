package com.hotel;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {
    @GetMapping(value = {"/", "/login", "/signup", "/rooms", "/bookings", "/book/{id}", "/admin"})
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
