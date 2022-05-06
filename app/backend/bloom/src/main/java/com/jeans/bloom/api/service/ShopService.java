package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.api.response.ShopRes;

import java.math.BigDecimal;
import java.util.List;

public interface ShopService {
    ShopRes findShopByShopNumber(String shopNumber) throws Exception;

    List<ItemRes> findItemsByShop_ShopNumber(String shopNumber) throws Exception;

    List<ShopRes> findShopListByShopLngBetweenAndShopLatBetweenAndUser_userId(BigDecimal lng_min, BigDecimal lng_max, BigDecimal lat_min, BigDecimal lat_max, String user_id)throws Exception;

    List<ShopRes> findShopByKeyword(String user_id, String keyword) throws Exception;

}
