package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.type.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * LJA | 2022.04.28
 * @name ReviewRepository
 * @des Review 관리를 위한 JpaRepository
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Optional<List<Review>> findReviewsByReservation_Shop_ShopNumberAndIsBan(String shopNumber, StatusType isBan) throws Exception;

    List<Review> findReviewByReservation_Shop_ShopNumber(String shopNumber);

    Review findReviewByReservation_reservationId(int reservationId) throws Exception;
}
