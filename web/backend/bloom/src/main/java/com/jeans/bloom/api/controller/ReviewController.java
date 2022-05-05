package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.ReviewCommentReq;
import com.jeans.bloom.api.request.UserRegiPostReq;
import com.jeans.bloom.api.service.ReviewService;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * OYT | 2022.04.27
 * @name ReviewController
 * @des Review API 사용을 위한 Controller
 */

@Api(value = "유저 API", tags = {"Review"})
@RequestMapping("/review")
@RestController
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    /**
     * OYT | 2022.05.05
     * @name creatComment
     * @api {post} /review
     * @des 리뷰 아이디와 내용을 입력받아 답글 등록
     */
    @PostMapping()
    @ApiOperation(value = "리뷰 답글 등록", notes = "리뷰 답글 등록")
    public ResponseEntity<BaseResponseBody> creatComment(
            @RequestBody @ApiParam(value="답글 정보", required = true) ReviewCommentReq reviewCommentReq) {

        try{
            Review reviewGetByReviewId = reviewService.findReviewByReviewId(reviewCommentReq.getReview_id());

            if(reviewGetByReviewId != null){
               reviewService.creatComment(reviewCommentReq);
                return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
            }
                return ResponseEntity.status(201).body(BaseResponseBody.of( "fail", "등록에 실패했습니다."));

        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * OYT | 2022.05.05
     * @name reviewReport
     * @api {patch} /review/{review_id}
     * @des 리뷰 아이디를 입력 받아 신고
     */
    @PatchMapping("/{review_id}")
    @ApiOperation(value = "리뷰 신고", notes = "리뷰 아이디를 입력 받아 신고")
    public ResponseEntity<BaseResponseBody> reviewReport(
            @PathVariable @ApiParam(value="리뷰아이디", required = true) int review_id) {

        try{
            Review reviewGetByReviewId = reviewService.findReviewByReviewId(review_id);

            if(reviewGetByReviewId != null){
                reviewService.reviewReport(review_id);
                return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
            }
            return ResponseEntity.status(201).body(BaseResponseBody.of( "fail", "신고에 실패했습니다."));

        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }
}
