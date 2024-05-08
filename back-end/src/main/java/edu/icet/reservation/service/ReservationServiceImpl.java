package edu.icet.reservation.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.icet.reservation.entity.CategoryEntity;
import edu.icet.reservation.entity.FoodEntity;
import edu.icet.reservation.model.Category;
import edu.icet.reservation.model.Food;
import edu.icet.reservation.model.ModifyFood;
import edu.icet.reservation.repository.CategoryRepository;
import edu.icet.reservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {
    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public void saveFood(Food food) {
        FoodEntity foodEntity = objectMapper.convertValue(food, FoodEntity.class);
        reservationRepository.save(foodEntity);
    }

    @Override
    public List<Food> getAllFood() {
        Iterable<FoodEntity> allFood = reservationRepository.findAll();
        List<Food> foods = new ArrayList<>();

        allFood.forEach(foodEntity -> {
            Food food = objectMapper.convertValue(foodEntity, Food.class);
            foods.add(food);
        });
        return foods;
    }

    @Override
    public List<Food> getFoodForPage(Integer number) {
        Long numberOfEntities = reservationRepository.count();
        List<Food> foods = new ArrayList<>();

        if ((numberOfEntities > 0 && numberOfEntities <= 10) && number == 1) {
            return getAllFood();
        } else {
            ArrayList<Integer> parameters = getFoodPageParameters(numberOfEntities, number);

            Iterable<FoodEntity> pageFood = reservationRepository.findByIdBetween(parameters.get(0), parameters.get(1));

            pageFood.forEach(foodEntity -> {
                Food food = objectMapper.convertValue(foodEntity, Food.class);
                foods.add(food);
            });
        }
        return foods;
    }

    @Override
    public int getNumberOfPages() {
        int numberOfPages;
        Long numberOfEntities = reservationRepository.count();

        if(numberOfEntities>10){
            double value = numberOfEntities.doubleValue()/10;
            String[] arr = String.valueOf(value).split("\\.");
            int[] intArr = new int[2];
            intArr[0] = Integer.parseInt(arr[0]);
            intArr[1] = Integer.parseInt(arr[1]);

            if(intArr[1]!=0){
                numberOfPages = intArr[0]+1;
            } else {
                numberOfPages = intArr[0];
            }
        } else {
            numberOfPages = 1;
        }
        return numberOfPages;
    }

    @Override
    public List<Category> getCategories() {
        Iterable<CategoryEntity> allCategory = categoryRepository.findAll();
        List<Category> categories = new ArrayList<>();

        allCategory.forEach(categoryEntity -> {
            Category category = objectMapper.convertValue(categoryEntity, Category.class);
            categories.add(category);
        });
        return categories;
    }

    @Override
    public int modifyFood(ModifyFood modifyFood) {
        return reservationRepository.updateFood(modifyFood.getId(), modifyFood.getName(), modifyFood.getDescription(), modifyFood.getPrice(), modifyFood.getCategory());
    }

    private ArrayList<Integer> getFoodPageParameters(Long numberOfEntities, Integer number) {
        ArrayList<Integer> parameters = new ArrayList<>();
        int pageMax = number * 10;

        if (numberOfEntities >= pageMax) {
            int from = Integer.parseInt(number - 1 + "1");
            parameters.add(from);
            parameters.add(pageMax);
        } else if (numberOfEntities.intValue() > pageMax && number == 1) {
            parameters.add(1);
            parameters.add(10);
        } else if (numberOfEntities.intValue() < pageMax) {
            int from = Integer.parseInt(number - 1 + "1");
            parameters.add(from);
            parameters.add(numberOfEntities.intValue());
        }
        return parameters;
    }


}
