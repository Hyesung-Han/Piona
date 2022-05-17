package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.CartListReq;
import com.jeans.bloom.api.request.CartReq;
import com.jeans.bloom.api.response.CartRes;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.Cart;
import com.jeans.bloom.db.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    public BaseResponseBody addCartItem(CartReq cartItem) throws Exception {
        List<Cart> cartList = cartRepository.findCartsByUser_UserId(cartItem.getUserId()).orElse(null);
        if(cartList != null) {
            String shopNumber = cartItem.getShopNumber();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

             List<Cart> cartFilterList = cartList.stream().filter(cart -> !(cart.getShop().getShopNumber().equals(shopNumber))).collect(Collectors.toList());

            if(cartFilterList.size() > 0) {
                return BaseResponseBody.of("fail", "shopNumber");
            }
            cartFilterList = cartList.stream().filter(cart-> !((cart.getReservationDate()).format(formatter)).equals(cartItem.getReservationDate().format(formatter))).collect(Collectors.toList());
            if(cartFilterList.size() > 0){
                return BaseResponseBody.of("fail", "date");
            }else {
                List<Cart> changeCart = cartList.stream().filter(cart -> cart.getItem().getItemId().equals(cartItem.getItemId())).collect(Collectors.toList());
                if(changeCart.size() > 0){
                    for (Cart cart: changeCart) {
                        cart.setQuantity(cart.getQuantity() + cartItem.getQuantity());
                        cartRepository.save(cart);
                    }
                    return BaseResponseBody.of("success");
                }
                cartRepository.save(cartItem.toCart());
                return BaseResponseBody.of("success");
            }
        } else {
            cartRepository.save(cartItem.toCart());
            return BaseResponseBody.of("success");
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
        for(int id : cartId.getCart_list()) cartRepository.deleteById(id);
    }

    /**
     * OYT | 2022.05.17
     * @name deleteCart
     * @api {delete} /cart/{userId}
     * @des user id를 받아 장바구니에서 한번에 삭제해주는 메소드
     */
    @Override
    public void deleteCart(String user_id) throws Exception {

        List<Cart> list = cartRepository.findByUser_UserId(user_id);
        for(Cart cart : list) cartRepository.delete(cart);

    }
}
