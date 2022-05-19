package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.ReservationOrderStatusReq;
import com.jeans.bloom.api.request.ReservationStatusReq;
import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.api.service.ReservationService;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.type.OrderStatus;
import com.querydsl.core.types.Order;
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
     * @name findReservationsByShop_ShopNumber
     * @api {get} /reservation?shop_number={shop_number}
     * @des 가게 사업자번호를 통해 전체 예약현황을 조회하는 메소드
     */
    @GetMapping
    @ApiOperation(value = "예약자 현황", notes = "가게 사업자번호를 입력받아 예약자 현황을 조회하는 메소드")
    public ResponseEntity<BaseResponseBody> findReservationsByShop_ShopNumber(
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
     * @name changeOrderStatus
     * @api {patch} /reservation
     * @des 예약의 OrderStatus를 변경해주는 메소드
     */
    @PatchMapping
    @ApiOperation(value = "예약 상태 변경", notes = "예약 번호와 변경하고자 하는 주문 상태를 입력받아 예약 상태를 변경해주는 메소드")
    public ResponseEntity<BaseResponseBody> changeOrderStatus(
            @RequestBody @ApiParam(value = "예약번호와 상태", required = true) ReservationOrderStatusReq reservationOrderStatusReq) {
        try {
            reservationService.changeOrderStatus(reservationOrderStatusReq.getReservation_id(), reservationOrderStatusReq.getStatus());
            return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
        } catch(Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }
}
