package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.api.response.ShopRes;
import com.jeans.bloom.api.service.ItemService;
import com.jeans.bloom.api.service.ShopService;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.Item;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Api(value = "가게 API", tags = {"Shop"})
@RequestMapping("/shop")
@RestController
@CrossOrigin(value = {"*"}, maxAge = 6000)
public class ShopController {

    @Autowired
    private ShopService shopService;

    @Autowired
    private ItemService itemService;

    /**
     * HHS | 2022.04.27
     * @name findShopByShopNumber
     * @api {get} /shop?shopNumber=shop_number
     * @des 가게 번호를 이용하여 해당 가게의 상세 정보를 조회
     */
    @GetMapping
    @ApiOperation(value = "가게 상세 정보 조회", notes = "shop number로 해당 가게 상세 정보를 조회한다.")
    public ResponseEntity<BaseResponseBody> findShopByShopNumber(
            @RequestParam @ApiParam(value = "조회할 shop_number", required = true) String shopNumber){
        try{
            ShopRes shopRes = shopService.findShopByShopNumber(shopNumber);
            return ResponseEntity.status(200).body(BaseResponseBody.of("success",shopRes));
        }catch  (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail",e));
        }

    }


    /**
     * HHS | 2022.04.28
     * @name findItemsByShop_ShopNumber
     * @api {get} /shop/item?shopNumber=shop_number
     * @des 가게 번호를 이용하여 해당 가게의 상품 리스트를 조회
     */
    @GetMapping("/item")
    @ApiOperation(value = "상품 리스트 조회", notes = "shop number로 해당 가게 상품리스트를 조회한다.")
    public ResponseEntity<BaseResponseBody> findItemsByShop_ShopNumber(
            @RequestParam @ApiParam(value = "조회할 shop_number", required = true) String shopNumber){
        try{
            List<ItemRes> itemList = shopService.findItemsByShop_ShopNumber(shopNumber);
            return ResponseEntity.status(200).body(BaseResponseBody.of("success",itemList));
        }catch  (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail",e));
        }
    }

    /**
     * OYT | 2022.04.28
     * @name findItemByItemId
     * @api {get} /shop/{item_id}
     * @des 가게 번호를 이용하여 해당 가게의 상품 리스트를 조회
     */
    @GetMapping("{itemId}")
    @ApiOperation(value = "상품 상세 조회", notes = "item_id로 해당 가게 상품 상세 내용을 조회한다.")
    public ResponseEntity<BaseResponseBody> findItemByItemId(
            @PathVariable @ApiParam(value = "상품 ID", required = true) int itemId){

            try{
                Item item = itemService.findItemByItemId(itemId);
                if(item != null){
                    return ResponseEntity.status(200).body(BaseResponseBody.of("success", ItemRes.of(item)));
                }
                return ResponseEntity.status(200).body(BaseResponseBody.of("fail"));

            }catch(Exception e){
                return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
            }
    }

    /**
     * LJA | 2022.05.04
     * @name getUnableDate
     * @api {get} /shop/reservation
     * @des item_id와 quantity를 입력받아 해당 아이템을 예약할 수 없는 날짜를 리턴
     */
    @GetMapping("/reservation")
    @ApiOperation(value = "예약불가일 조회", notes = "item_id와 quantity를 입력받아 예약이 불가능한 날짜를 조회한다")
    public ResponseEntity<BaseResponseBody> getReservationDate(
            @RequestParam @ApiParam(value = "상품 ID", required = true) int item_id, @ApiParam(value = "수량", required = true) int quantity){
        try{
            List<Date> unableDateList = shopService.getUnableDate(item_id, quantity);
            return ResponseEntity.status(200).body(BaseResponseBody.of("success", unableDateList.stream()
                    .map(date -> new SimpleDateFormat("yyyy-MM-dd").format(date)).collect(Collectors.toList())));
        }catch(Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }
}
