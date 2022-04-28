package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.WishListReq;

public interface WishListService {
    void insertWishList(WishListReq wishList) throws Exception;

    void deleteWishList(int wishId) throws Exception;
}
