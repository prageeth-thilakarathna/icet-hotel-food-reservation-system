package edu.icet.reservation.repository;

import edu.icet.reservation.entity.FoodEntity;
import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<FoodEntity, Integer> {
    Iterable<FoodEntity> findByIdBetween(int from, int to);
}
