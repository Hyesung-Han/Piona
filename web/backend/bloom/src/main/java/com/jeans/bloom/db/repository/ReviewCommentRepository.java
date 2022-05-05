package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.ReviewComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * OYT | 2022.05.05
 * @name ReviewCommentRepository
 * @des 리뷰 코멘트 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface ReviewCommentRepository extends JpaRepository<ReviewComment, String> {
}
