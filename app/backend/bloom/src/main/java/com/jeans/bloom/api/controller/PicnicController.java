package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.api.service.PicnicService;
import com.jeans.bloom.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * LJA | 2022.04.28
 * @name PicnicController
 * @des 피크닉 API 사용을 위한 Controller
 */
@RestController
@RequestMapping("/api/picnic")
@Api(value = "피크닉 API", tags = {"Picnic"})
public class PicnicController {

    @Autowired
    private PicnicService picnicService;

    /**
     * LJA | 2022.04.28
     * @name findReservationsByUser_UserId
     * @api {get} /picnic?user_id=user_id
     * @des 회원 아이디를 입력받아 회원의 전체 예약리스트을 리턴해주는 메소드
     */
    @GetMapping
    @ApiOperation(value = "예약현황 조회", notes = "아이디를 통해 회원의 예약현황을 조회한다")
    public ResponseEntity<BaseResponseBody> findReservationsByUser_UserId(
            @RequestParam @ApiParam(value="아이디", required = true) String userId) {
        try{
            List<ReservationRes> reservationResList = picnicService.findReservationsByUser_UserId(userId);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success", reservationResList));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }

    /**
     * LJA | 2022.04.28
     * @name cancleReservation
     * @api {patch} /picnic?reservation_id=reservation_id
     * @des 예약 취소를 위한 메소드로 예약 Status를 C로 변경
     */
    @PatchMapping
    @ApiOperation(value = "예약취소", notes = "예약번호를 통해 예약을 취소함")
    public ResponseEntity<BaseResponseBody> cancleReservation(
            @RequestParam @ApiParam(value="예약번호", required = true) int reservationId) {
        try{
            picnicService.cancleReservation(reservationId);
            /**
             * TODO
             * cancleReservation() 호출로 reservation_t 상태 변경하는 것 까지 완성
             * 결제 취소 관련한 기능도 필요!!
             */
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }
}
