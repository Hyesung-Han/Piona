package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.api.response.ShopRes;

import java.util.List;

public interface ShopService {
    ShopRes findShopByShopNumber(String shopNumber) throws Exception;

    List<ItemRes> findItemsByShop_ShopNumber(String shopNumber) throws Exception;
}
