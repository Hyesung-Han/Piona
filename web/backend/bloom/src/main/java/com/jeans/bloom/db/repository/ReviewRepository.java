package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.type.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * OYT | 2022.05.05
 * @name ReviewRepository
 * @des 리뷰 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
    Review findReviewByReviewId(Integer review_id) throws Exception;

    Optional<List<Review>> findReviewsByReservation_Shop_ShopNumber(String shopNumber) throws Exception;

    Optional<List<Review>> findReviewsByIsBan(StatusType y) throws Exception;
}
