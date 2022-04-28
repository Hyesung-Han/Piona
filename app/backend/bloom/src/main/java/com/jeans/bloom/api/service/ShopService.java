package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ShopRes;

public interface ShopService {
    ShopRes findShopByShopNumber(String shopNumber) throws Exception;
}
