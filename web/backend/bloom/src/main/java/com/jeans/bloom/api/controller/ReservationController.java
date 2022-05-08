package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.ReservationStatusReq;
import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.api.service.ReservationService;
import com.jeans.bloom.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * LJA | 2022.05.08
 * @name ReservationController
 * @des 기업페이지에서 예약관리 API 사용을 위한 Controller
 */
@Api(value = "기업 예약관리 API", tags = {"Reservation"})
@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    /**
     * LJA | 2022.05.08
     * @name getReview
     * @api {get} /reservation?shop_number={shop_number}
     * @des 가게 사업자번호를 통해 전체 예약현황을 조회하는 메소드
     */
    @GetMapping
    @ApiOperation(value = "예약자 현황", notes = "가게 사업자번호를 입력받아 예약자 현황을 조회하는 메소드")
    public ResponseEntity<BaseResponseBody> getReview(
            @RequestParam @ApiParam(value = "가게 사업자번호", required = true) String shop_number
    ) {
        try {
            List<ReservationRes> reservationResList = reservationService.findReservationsByShop_ShopNumber(shop_number);
            return ResponseEntity.status(200).body(BaseResponseBody.of("success", reservationResList));
        } catch(Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * LJA | 2022.05.08
     * @name ReservationController
     * @api {get} /reservation/shop_number={shop_number}
     * @des 기업페이지에서 예약관리 API 사용을 위한 Controller
     */
    @PatchMapping
    @ApiOperation(value = "예약자 현황", notes = "가게 사업자번호를 입력받아 예약자 현황을 조회하는 메소드")
    public ResponseEntity<BaseResponseBody> changeOrderStatus(
            @RequestBody @ApiParam(value = "", required = true)ReservationStatusReq reservationStatusReq) {
        return null;
    }
}
