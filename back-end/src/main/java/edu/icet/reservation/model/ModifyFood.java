package edu.icet.reservation.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ModifyFood {
    private Integer id;
    private String name;
    private String description;
    private double price;
    private String category;
}
