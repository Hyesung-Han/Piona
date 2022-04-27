package com.jeans.bloom.api.service;

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
    public List<CartRes> findCartsByUser_UserId(String userId) {
        Optional<List<Cart>> optionalCarts = cartRepository.findCartsByUser_UserId(userId);
        return optionalCarts.map(carts -> carts.stream().map(cart -> CartRes.of(cart)).collect(Collectors.toList())).orElse(null);
    }
}
