package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.api.response.ShopRes;
import com.jeans.bloom.api.service.ItemService;
import com.jeans.bloom.api.service.SearchShopService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    @Autowired
    private SearchShopService searchShopService;
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
     * HHS | 2022.05.06
     * @name findShopBySearchWord
     * @api {get} /shop/search?type=type&user_id=user_id&user_lat=user_lat&user_lng=user_lng&word=word
     * @des 검색어를 이용하여 상점 리스트 반환
     */
    @GetMapping("/search")
    @ApiOperation(value = "검색어 혹은 위도,경도", notes = "검색을 통한 상점의 목록 불러오기")
    public ResponseEntity<BaseResponseBody> findShopBySearchWord(
        @RequestParam @ApiParam(value = "유저아이디", required = true) String user_id, @ApiParam(value = "타입", required = true) String type,
        @ApiParam(value = "검색어", required = false) String word, @ApiParam(value = "경도", required = false) double user_lng,
        @ApiParam(value="위도", required = false) double user_lat) {
        if(type.equals("location")) {
            try {
                List<ShopRes> shopList = searchShopService.search(user_id, word, user_lng, user_lat);
                return ResponseEntity.status(200).body(BaseResponseBody.of("success", shopList));
            } catch (Exception e) {
                return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
            }
        } else if (type.equals("keyword")) {

            try {
                List<ShopRes> shopList = shopService.findShopByKeyword(user_id, word);
                return ResponseEntity.status(200).body(BaseResponseBody.of("success", shopList));
            } catch (Exception e) {
                return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
            }
        }else{
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", "잘못된 type값 입니다."));
        }
    }

    /**
     * LJA | 2022.05.13
     * @name getCoordsByAddress
     * @api {get} /shop/coords?address={address}
     * @des 주소를 이용하여 위도, 경도 반환
     */
    @GetMapping("/coords")
    @ApiOperation(value = "주소", notes = "주소를 이용하여 위도, 경도 불러오기")
    public ResponseEntity<BaseResponseBody> getCoordsByAddress(
            @RequestParam @ApiParam(value = "주소", required = true) String address) {
        try {
            double[] coords = searchShopService.addrToCoords(address);
            Map map = new HashMap();
            map.put("x", coords[0]);
            map.put("y", coords[1]);
            return ResponseEntity.status(200).body(BaseResponseBody.of("success", map));
        } catch (Exception e) {
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
                    .map(date -> new SimpleDateFormat("yyyy-MM-dd").format(date)).distinct().collect(Collectors.toList())));
        }catch(Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }
}
