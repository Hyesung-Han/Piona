package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.CartListReq;
import com.jeans.bloom.api.request.CartReq;
import com.jeans.bloom.api.response.CartRes;
import com.jeans.bloom.common.response.BaseResponseBody;

import java.util.List;

public interface CartService {

    List<CartRes> findCartsByUser_UserId(String userId) throws Exception;

    BaseResponseBody addCartItem(CartReq cart) throws Exception;

    void deleteCartItem(CartListReq cartId) throws Exception;
}
