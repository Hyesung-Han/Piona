package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.WishListReq;
import com.jeans.bloom.api.service.WishListService;
import com.jeans.bloom.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * HHS | 2022.04.28
 * @name WishListController
 * @des 위시리스트 API 사용을 위한 Controller
 */
@Api(value = "위시리스트 API", tags = {"WishList"})
@RequestMapping("/api/wishlist")
@RestController
@CrossOrigin(value = {"*"}, maxAge = 6000)
public class WishListController {

    @Autowired
    private WishListService wishListService;
    /**
     * HHS | 2022.04.28
     * @name insertWishList
     * @api {post} /wishlist
     * @des 가게 번호와 유저 아이디를 이용하여 위시리스트 추가
     */
    @PostMapping
    @ApiOperation(value = "위시리스트 추가", notes = "shop_number와 user_id를 받아 위시리스트에 추가한다")
    public ResponseEntity<BaseResponseBody> insertWishList(
            @RequestBody @ApiParam(value="아이디", required = true) WishListReq wishList) {
        try{
            wishListService.insertWishList(wishList);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }


}
