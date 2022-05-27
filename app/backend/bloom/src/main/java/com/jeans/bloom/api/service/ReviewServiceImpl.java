package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ReviewWriteReq;
import com.jeans.bloom.api.response.ReviewDetailRes;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.type.StatusType;
import com.jeans.bloom.db.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * LJA | 2022.04.28
 * @name ReviewServiceImpl
 * @des 리뷰 API 사용을 위한 Service
 */
@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * LJA | 2022.04.28
     * @name findReviewsByReservation_Shop_ShopNumberAndIsBan
     * @des 가게 사업자번호를 입력받아 리뷰목록을 조회하는 메소드
     */
    @Override
    public List<ReviewDetailRes> findReviewsByReservation_Shop_ShopNumberAndIsBan(String shopNumber, StatusType isBan) throws Exception {
        List<Review> reviews = reviewRepository.findReviewsByReservation_Shop_ShopNumberAndIsBan(shopNumber, isBan).orElse(null);
        return reviews.stream().map(review -> ReviewDetailRes.of(review)).collect(Collectors.toList());
    }

    /**
     * LJA | 2022.04.28
     * @name writeReview
     * @des 리뷰작성 정보를 받아 리뷰를 저장하는 API
     */
    @Override
    public void writeReview(ReviewWriteReq reviewWriteReq) throws Exception {
        reviewRepository.save(reviewWriteReq.toReview());
    }

    @Override
    public boolean findOneReview(int reservationId) throws Exception {
        Review review = reviewRepository.findReviewByReservation_reservationId(reservationId);
        if(review != null){
            return true;
        }else{
            return false;
        }
    }


}
