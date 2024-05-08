package edu.icet.reservation.repository;

import edu.icet.reservation.entity.FoodEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends CrudRepository<FoodEntity, Integer> {
    Iterable<FoodEntity> findByIdBetween(int from, int to);

    @Transactional
    @Modifying
    @Query("UPDATE FoodEntity SET name = :name, description = :description, price = :price, category = :category WHERE id = :id")
    int updateFood(@Param("id") Integer id, @Param("name") String name, @Param("description") String description, @Param("price") double price, @Param("category") String category);
}
