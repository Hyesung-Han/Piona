package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * LJA | 2022.05.08
 * @name ReservationRepository
 * @des Reservation 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    Optional<List<Reservation>> findReservationsByShop_ShopNumber(String shopNumber) throws Exception;
}
