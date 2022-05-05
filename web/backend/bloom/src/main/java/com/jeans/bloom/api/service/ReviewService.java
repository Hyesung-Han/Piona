package com.jeans.bloom.api.service;


import com.jeans.bloom.api.request.ReviewCommentReq;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.ReviewComment;

public interface ReviewService {
    Review findReviewByReviewId(Integer review_id) throws Exception;

    ReviewComment creatComment(ReviewCommentReq reviewCommentReq) throws Exception;

    Review reviewReport(int review_id) throws Exception;
}
