package edu.icet.reservation.controller;

import edu.icet.reservation.model.Category;
import edu.icet.reservation.model.Food;
import edu.icet.reservation.model.ModifyFood;
import edu.icet.reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ReservationController {
    @Autowired
    ReservationService reservationService;

    @PostMapping("/save-food")
    public void saveFood(@RequestBody Food food){
        reservationService.saveFood(food);
    }

    @GetMapping("/get-all-food")
    public List<Food> getAllFood(){
        return reservationService.getAllFood();
    }

    @GetMapping("/get-food-for-page/{number}")
    public List<Food> getFoodForPage(@PathVariable Integer number){
        return reservationService.getFoodForPage(number);
    }

    @GetMapping("/get-number-of-pages")
    public int getNumberOfPages(){
        return reservationService.getNumberOfPages();
    }

    @GetMapping("/get-categories")
    public List<Category> getCategories(){
        return reservationService.getCategories();
    }

    @PatchMapping("/modify-food")
    public int modifyFood(@RequestBody ModifyFood modifyFood){
        return reservationService.modifyFood(modifyFood);
    }
}
