package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ReviewCommentReq;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.ReviewComment;
import com.jeans.bloom.db.entity.type.StatusType;
import com.jeans.bloom.db.repository.ReviewCommentRepository;
import com.jeans.bloom.db.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * OYT | 2022.05.05
 * @name ReviewServiceImpl
 * @des 리뷰 관련 로직처리를 위한 서비스 구현 정의
 */

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewCommentRepository reviewCommentRepository;

    /**
     * OYT | 2022.05.05
     * @name findReviewByReviewId
     * @des 리뷰아이디를 통해 리뷰 정보를 불러오는 메서드
     */
    @Override
    public Review findReviewByReviewId(Integer review_id) throws Exception{
        return reviewRepository.findReviewByReviewId(review_id);
    }

    /**
     * OYT | 2022.05.05
     * @name creatComment
     * @des 리뷰아이디로 리뷰 코멘트를 DB에 저장하는 메서드
     */
    @Override
    public ReviewComment creatComment(ReviewCommentReq reviewCommentReq) throws Exception{
        ReviewComment rc = new ReviewComment();

        rc.setReview(findReviewByReviewId(reviewCommentReq.getReview_id()));
        rc.setContent(reviewCommentReq.getContent());

        return reviewCommentRepository.save(rc);
    }

    /**
     * OYT | 2022.05.05
     * @name reviewReport
     * @des 리뷰아이디를 통해 리뷰를 신고하는 메서드
     */
    @Override
    public Review reviewReport(int review_id) throws Exception {
        Review review = findReviewByReviewId(review_id);
        review.setIsBan(StatusType.Y);
        return reviewRepository.save(review);
    }
}
