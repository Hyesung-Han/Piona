package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.WishListReq;

public interface WishListService {
    void insertWishList(WishListReq wishList) throws Exception;
}
