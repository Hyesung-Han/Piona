package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.ReservationOrderStatusReq;
import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.api.response.SaleRes;
import com.jeans.bloom.api.service.ReservationService;
import com.jeans.bloom.api.service.SaleService;
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
 * @name SaleController
 * @des 기업페이지에서 매출현황을 나타내기 위한 Controller
 */
@Api(value = "매출현황 API", tags = {"Sale"})
@RestController
@RequestMapping("/sale")
public class SaleController {

    @Autowired
    private SaleService saleService;

    /**
     * LJA | 2022.05.08
     * @name getTotalSale
     * @api {get} /sale?shop_number={shop_number}
     * @des shop_number를 사용해 매출 현황을 가져오는 메소드
     */
    @GetMapping
    @ApiOperation(value = "매출 현황", notes = "가게 사업자번호와 날짜를 입력받아 매출 현황을 조회하는 메소드")
    public ResponseEntity<BaseResponseBody> getTotalSale(
            @RequestParam @ApiParam(value = "가게 사업자번호", required = true) String shop_number
    ) {
        try {
            List<SaleRes> saleResList = saleService.getTotalSale(shop_number);
            return ResponseEntity.status(200).body(BaseResponseBody.of("success", saleResList));
        } catch(Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }
}
