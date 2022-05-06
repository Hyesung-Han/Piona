package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.ReviewWriteReq;
import com.jeans.bloom.api.response.ReviewDetailRes;
import com.jeans.bloom.api.service.ReviewService;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.type.StatusType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * LJA | 2022.04.28
 * @name ReviewController
 * @des 장바구니 API 사용을 위한 Controller
 */
@RestController
@RequestMapping("/review")
@Api(value = "리뷰 API", tags = {"Review"})
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    /**
     * LJA | 2022.04.28
     * @name findReviewsByReservation_Shop_ShopNumberAndIsBan
     * @api {get} /review?shop_number=shop_number
     * @des 가게 사업자번호를 입력받아 리뷰목록을 조회하는 메소드
     */
    @GetMapping
    @ApiOperation(value = "리뷰 목록 조회", notes = "가게 사업자번호를 통해 리뷰 리스트를 조회한다")
    public ResponseEntity<BaseResponseBody> findReviewsByReservation_Shop_ShopNumberAndIsBan(
            @RequestParam @ApiParam(value="가게사업자번호", required = true) String shopNumber) {
        try{
            List<ReviewDetailRes> reviewDetailResList = reviewService.findReviewsByReservation_Shop_ShopNumberAndIsBan(shopNumber, StatusType.N);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success", reviewDetailResList));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }

    /**
     * LJA | 2022.04.28
     * @name writeReview
     * @api {post} /review
     * @des 리뷰작성 정보를 받아 리뷰를 저장하는 API
     */
    @PostMapping
    @ApiOperation(value = "리뷰 작성하기", notes = "리뷰 작성 정보를 받아 리뷰를 저장한다")
    public ResponseEntity<BaseResponseBody> writeReview(
            @RequestBody @ApiParam(value="리뷰작성정보", required = true) ReviewWriteReq reviewWriteReq) {
        try{
            reviewService.writeReview(reviewWriteReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }
}
