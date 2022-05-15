package com.jeans.bloom.api.service;


import com.jeans.bloom.api.request.ReviewCommentReq;
import com.jeans.bloom.api.response.ReviewRes;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.ReviewComment;
import com.jeans.bloom.db.entity.type.StatusType;

import java.util.List;

public interface ReviewService {
    Review findReviewByReviewId(Integer review_id) throws Exception;

    ReviewComment creatComment(ReviewCommentReq reviewCommentReq) throws Exception;

    Review reviewReport(int review_id, StatusType type) throws Exception;

    Boolean deleteReview(int review_id) throws Exception;

    List<ReviewRes> findReviewsByReservation_Shop_ShopNumber(String shopNumber) throws Exception;

    ReviewRes findReviewDetailByReviewId(int review_id) throws Exception;

    List<ReviewRes> findReviewsByIsBan(StatusType y) throws Exception;
}
