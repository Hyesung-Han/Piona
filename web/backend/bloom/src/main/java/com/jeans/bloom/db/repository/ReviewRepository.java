package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * OYT | 2022.05.05
 * @name ReviewRepository
 * @des 리뷰 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
    Review findReviewByReviewId(Integer review_id) throws Exception;
}
