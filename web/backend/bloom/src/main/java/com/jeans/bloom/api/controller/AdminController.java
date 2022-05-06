package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.service.ReviewService;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.type.StatusType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * OYT | 2022.04.27
 * @name AdminController
 * @des Review API 사용을 위한 Controller
 */
@Api(value = "어드민 API", tags = {"Admin"})
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    ReviewService reviewService;

    /**
     * OYT | 2022.05.05
     * @name reportCancel
     * @api {patch} /admin/{review_id}
     * @des 리뷰 아이디를 입력 받아 신고 취소
     */
    @PatchMapping("/{review_id}")
    @ApiOperation(value = "리뷰 신고 취소", notes = "리뷰 아이디를 입력 받아 신고 취소")
    public ResponseEntity<BaseResponseBody> reportCancel(
            @PathVariable @ApiParam(value="리뷰아이디", required = true) int review_id) {

        try{
            Review reviewGetByReviewId = reviewService.findReviewByReviewId(review_id);

            if(reviewGetByReviewId != null){
                reviewService.reviewReport(review_id, StatusType.N);
                return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
            }
            return ResponseEntity.status(201).body(BaseResponseBody.of( "fail", "신고 상태변경에 실패했습니다."));

        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * OYT | 2022.05.05
     * @name deleteReview
     * @api {Delete} /admin/{review_id}
     * @des 리뷰 아이디를 입력 받아 신고
     */
    @DeleteMapping("/{review_id}")
    @ApiOperation(value = "리뷰 삭제", notes = "리뷰 아이디를 입력 받아 삭제")
    public ResponseEntity<BaseResponseBody> deleteReview(
            @PathVariable @ApiParam(value="리뷰아이디", required = true) int review_id) {
        try{
            Boolean result = reviewService.deleteReview(review_id);
            if(result){
                return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
            }
            return ResponseEntity.status(201).body(BaseResponseBody.of( "fail", "리뷰삭제에 실패했습니다."));

        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }
}
