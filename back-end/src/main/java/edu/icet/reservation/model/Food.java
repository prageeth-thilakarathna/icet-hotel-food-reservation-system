package edu.icet.reservation.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Food {
    private Integer id;
    private String name;
    private String description;
    private double price;
    private String category;
    private boolean isAvailable;
}
