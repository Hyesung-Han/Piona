package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ReviewCommentReq;
import com.jeans.bloom.api.response.ReviewRes;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.ReviewComment;
import com.jeans.bloom.db.entity.type.StatusType;
import com.jeans.bloom.db.repository.ReviewCommentRepository;
import com.jeans.bloom.db.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
     * @des 리뷰아이디를 통해 리뷰를 신고상태를 변경하는 메서드
     */
    @Override
    public Review reviewReport(int review_id, StatusType type) throws Exception {
        Review review = findReviewByReviewId(review_id);
        review.setIsBan(type);
        return reviewRepository.save(review);
    }

    /**
     * OYT | 2022.05.05
     * @name deleteReview
     * @des 리뷰아이디를 통해 리뷰를 삭제하는 메서드
     */
    @Override
    public Boolean deleteReview(int review_id) throws Exception {

        Review review = findReviewByReviewId(review_id);
        if(review != null){
            reviewRepository.delete(review);
            return true;
        }else return false;

    }

    /**
     * HHS | 2022.05.06
     * @name findReviewsByReservation_Shop_ShopNumber
     * @des 사업자 등록번호를 통해 해당 가게의 리뷰리스트를 불러오는 메서드
     */
    @Override
    public List<ReviewRes> findReviewsByReservation_Shop_ShopNumber(String shopNumber) throws Exception{
        List<Review> reviews = reviewRepository.findReviewsByReservation_Shop_ShopNumberOrderByReviewIdDesc(shopNumber).orElse(null);
        return reviews.stream().map(review -> ReviewRes.of(review)).collect(Collectors.toList());
    }

    /**
     * HHS | 2022.05.06
     * @name findReviewDetailByReviewId
     * @des 리뷰 아이디를 통해 리뷰 상세 정보를 가져오는 메서드
     */
    @Override
    public ReviewRes findReviewDetailByReviewId(int reviewId) throws Exception {
        ReviewRes reviewRes = ReviewRes.of(reviewRepository.findReviewByReviewId(reviewId));
        return reviewRes;
    }

    /**
     * OYT | 2022.05.06
     * @name findReviewsByIsBan
     * @des 신고된 리뷰 정보를 가져오는 메서드
     */
    @Override
    public List<ReviewRes> findReviewsByIsBan(StatusType y) throws Exception {
        List<Review> reviews = reviewRepository.findReviewsByIsBan(y).orElse(null);
        return reviews.stream().map(review -> ReviewRes.of(review)).collect(Collectors.toList());
    }

}
