package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.response.BaseResponseBody;
import com.jeans.bloom.api.response.ShopRes;
import com.jeans.bloom.api.service.ShopService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "가게 API", tags = {"Shop"})
@RequestMapping("/api/shop")
@RestController
@CrossOrigin(value = {"*"}, maxAge = 6000)
public class ShopController {

    @Autowired
    private ShopService shopService;

    /**
     * HHS | 2022.04.27
     * @name findShopByShopNumber
     * @api {get} /shop/shopNumber
     * @des 가게 번호를 이용하여 해당 가게의 상세 정보를 조회
     */
    @GetMapping("/{shopNumber}")
    @ApiOperation(value = "가게 상세 정보 조회", notes = "shop number로 해당 가게 상세 정보를 조회한다.")
    public ResponseEntity<BaseResponseBody> findShopByShopNumber(
            @PathVariable @ApiParam(value = "조회할 shop_number", required = true) String shopNumber){

        ShopRes shopRes = shopService.findShopByShopNumber(shopNumber);
        if(shopRes == null) return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", "해당 가게가 없습니다."));
        return ResponseEntity.status(200).body(BaseResponseBody.of("success",shopRes));
    }

}
