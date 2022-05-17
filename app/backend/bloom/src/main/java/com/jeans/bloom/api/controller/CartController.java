package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.CartListReq;
import com.jeans.bloom.api.request.CartReq;
import com.jeans.bloom.api.response.CartRes;
import com.jeans.bloom.api.service.CartService;
import com.jeans.bloom.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * LJA | 2022.04.27
 * @name CartController
 * @des 장바구니 API 사용을 위한 Controller
 */
@RestController
@RequestMapping("/cart")
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
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }

    /**
     * LJA | 2022.04.28
     * @name addCartItem
     * @api {post} /cart
     * @des 아이템 정보를 받아 장바구니(cart)에 아이템을 추가해주는 메소드
     */
    @PostMapping
    @ApiOperation(value = "장바구니에 아이템 추가", notes = "아이템 정보를 입력받아 cart에 추가한다")
    public ResponseEntity<BaseResponseBody> addCartItem(
            @RequestBody @ApiParam(value="아이디", required = true) CartReq cartItem) {
        try{
            BaseResponseBody result = cartService.addCartItem(cartItem);
            return ResponseEntity.status(200).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }

    /**
     * LJA | 2022.04.28
     * @name deleteCartItem
     * @api {delete} /cart
     * @des cart id를 받아 장바구니에서 삭제해주는 메소드
     */
    @DeleteMapping()
    @ApiOperation(value = "장바구니 아이템 삭제", notes = "cart id를 입력받아 장바구니에서 삭제한다")
    public ResponseEntity<BaseResponseBody> deleteCartItem(
            @RequestBody @ApiParam(value="카트id", required = true) CartListReq cart_list) {
        try{
            cartService.deleteCartItem(cart_list);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }


    /**
     * OYT | 2022.05.17
     * @name deleteCart
     * @api {delete} /cart/{userId}
     * @des user id를 받아 장바구니에서 한번에 삭제해주는 메소드
     */
    @DeleteMapping("/{user_id}")
    @ApiOperation(value = "카트 삭제", notes = "유저 아이디를 받아 카트에서 삭제한다")
    public ResponseEntity<BaseResponseBody> deleteCart(
            @PathVariable @ApiParam(value="유저 아이디", required = true) String user_id) {
        try{
            cartService.deleteCart(user_id);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }
}
