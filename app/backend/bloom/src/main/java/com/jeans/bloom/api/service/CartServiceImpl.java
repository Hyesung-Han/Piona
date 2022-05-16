package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.CartListReq;
import com.jeans.bloom.api.request.CartReq;
import com.jeans.bloom.api.response.CartRes;
import com.jeans.bloom.db.entity.Cart;
import com.jeans.bloom.db.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * LJA | 2022.04.27
 * @name CartServiceImpl
 * @des 장바구니 API 사용을 위한 Service
 */
@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    /**
     * LJA | 2022.04.27
     * @name findCartsByUser_UserId
     * @des 회원 아이디를 입력받아 회원의 장바구니 리스트를 리턴해주는 메소드
     */
    @Override
    public List<CartRes> findCartsByUser_UserId(String userId) throws Exception {
        Optional<List<Cart>> optionalCarts = cartRepository.findCartsByUser_UserId(userId);
        return optionalCarts.map(carts -> carts.stream().map(cart -> CartRes.of(cart)).collect(Collectors.toList())).orElse(null);
    }

    /**
     * LJA | 2022.04.28
     * @name addCartItem
     * @des 아이템 정보를 받아 장바구니(cart)에 아이템을 추가해주는 메소드
     */
    @Override
    public String addCartItem(CartReq cartItem) throws Exception {
        List<Cart> cartList = cartRepository.findCartsByUser_UserId(cartItem.getUserId()).orElse(null);
        if(cartList != null) {
            String shopNumber = cartItem.getShopNumber();
            List<Cart> cartFilterList = cartList.stream().filter(cart->!(cart.getShop().getShopNumber().equals(shopNumber))).collect(Collectors.toList());
            if(cartFilterList.size() > 0) {
                return "fail";
            } else {
                cartRepository.save(cartItem.toCart());
                return "success";
            }
        } else {
            cartRepository.save(cartItem.toCart());
            return "success";
        }
    }

    /**
     * LJA | 2022.04.28
     * @name deleteCartItem
     * @api {delete} /cart
     * @des cart id를 받아 장바구니에서 삭제해주는 메소드
     */
    @Override
    public void deleteCartItem(CartListReq cartId) throws Exception {
        for(int id : cartId.getCart_list()){
            cartRepository.deleteById(id);
        }
    }
}
