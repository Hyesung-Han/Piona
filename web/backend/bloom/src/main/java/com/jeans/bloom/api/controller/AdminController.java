package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.response.ReviewRes;
import com.jeans.bloom.api.response.UserListRes;
import com.jeans.bloom.api.service.ReviewService;
import com.jeans.bloom.api.service.UserService;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.type.StatusType;
import com.jeans.bloom.db.entity.type.UserCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @Autowired
    UserService userService;

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
     * @des 리뷰 아이디를 입력 받아 삭제
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

    /**
     * OYT | 2022.05.06
     * @name findUserByUserCodeAndIsDelNot
     * @api {get} /admin/userList
     * @des 회원 목록 반환
     */
    @GetMapping("/userList")
    @ApiOperation(value = "회원 목록", notes = "회원 목록 반환")
    public ResponseEntity<BaseResponseBody> findUserByUserCodeAndIsDelNot(
            @RequestParam @ApiParam(value = "유저코드", example = "M",required = true) UserCode code) {

        try{
            List<UserListRes> userList = userService.findUserByUserCodeAndIsDelNot(code);
            if(userList != null){
                return ResponseEntity.status(201).body(BaseResponseBody.of( "success", userList));
            }
            return ResponseEntity.status(201).body(BaseResponseBody.of( "fail", "조회에 실패하였습니다."));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * OYT | 2022.05.06
     * @name deleteUser
     * @api {patch} /admin/{user_id}
     * @des 회원 ID를 입력 받아 회원 상태 여부를 수정한다
     */
    @PatchMapping("/")
    @ApiOperation(value = "회원 상태 변경", notes = "회원 ID를 입력 받아 회원 상태 여부를 수정한다. ")
    public ResponseEntity<BaseResponseBody> deleteUser(
            @RequestParam @ApiParam(value="회원 ID", required = true) String user_id,
            @RequestParam @ApiParam(value="상태 Code", required = true) StatusType status_type) {

        try{
            userService.deleteUser(user_id, status_type);
            return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * OYT | 2022.05.06
     * @name findReviewsByIsBan
     * @api {get} /admin/review
     * @des 신고된 리뷰 리스트 받기
     */
    @GetMapping("/review")
    @ApiOperation(value = "리뷰 리스트", notes = "신고된 리뷰 리스트 받아오기")
    public ResponseEntity<BaseResponseBody> findReviewsByIsBan(){
        try{
            List<ReviewRes> reviewResList = reviewService.findReviewsByIsBan(StatusType.Y);
            return ResponseEntity.status(200).body(BaseResponseBody.of("success", reviewResList));
        }catch(Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }
}
