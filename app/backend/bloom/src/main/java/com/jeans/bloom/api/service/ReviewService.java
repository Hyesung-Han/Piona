package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ReviewWriteReq;
import com.jeans.bloom.api.response.ReviewDetailRes;
import com.jeans.bloom.db.entity.type.StatusType;

import java.util.List;

public interface ReviewService {

    List<ReviewDetailRes> findReviewsByReservation_Shop_ShopNumberAndIsBan(String shopNumber, StatusType isBan) throws Exception;

    void writeReview(ReviewWriteReq reviewWriteReq) throws Exception;

    boolean findOneReview(int reservationId) throws Exception;
}
