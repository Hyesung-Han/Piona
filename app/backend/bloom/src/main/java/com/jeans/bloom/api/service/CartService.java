package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.CartRes;

import java.util.List;

public interface CartService {

    List<CartRes> findCartsByUser_UserId(String userId);
}
