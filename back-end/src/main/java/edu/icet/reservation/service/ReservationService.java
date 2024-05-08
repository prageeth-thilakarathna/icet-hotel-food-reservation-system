package edu.icet.reservation.service;

import edu.icet.reservation.model.Category;
import edu.icet.reservation.model.Food;
import edu.icet.reservation.model.ModifyFood;

import java.util.List;

public interface ReservationService {
    void saveFood(Food food);

    List<Food> getAllFood();

    List<Food> getFoodForPage(Integer number);

    int getNumberOfPages();

    List<Category> getCategories();

    int modifyFood(ModifyFood modifyFood);

    int modifyAvailability(Integer id, boolean availability);
}
