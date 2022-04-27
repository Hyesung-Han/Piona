package com.jeans.bloom.api.controller;

import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.api.response.CartRes;
import com.jeans.bloom.api.service.CartService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * LJA | 2022.04.27
 * @name CartController
 * @des 장바구니 API 사용을 위한 Controller
 */
@RestController
@RequestMapping("/api/cart")
@Api(value = "장바구니 API", tags = {"Cart"})
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * LJA | 2022.04.27
     * @name findCartsByUser_UserId
     * @api {get} /cart?user_id=user_id
     * @des 회원 아이디를 입력받아 회원의 장바구니 리스트를 리턴해주는 메소드
     */
    @GetMapping
    @ApiOperation(value = "장바구니 아이템 조회", notes = "아이디를 통해 회원의 장바구니 리스트를 조회한다")
    public ResponseEntity<BaseResponseBody> findCartsByUser_UserId(
            @RequestParam @ApiParam(value="아이디", required = true) String userId) {
        try{
            List<CartRes> cartList = cartService.findCartsByUser_UserId(userId);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success", cartList));
        } catch (Error e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", "장바구니 리스트를 조회할 수 없습니다"));
        }
    }

}
