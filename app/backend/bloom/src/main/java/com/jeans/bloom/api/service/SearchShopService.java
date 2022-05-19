package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ShopRes;

import java.util.List;

public interface SearchShopService {

    List<ShopRes> search(String word, String user_id, double user_lng, double user_lat) throws Exception;
    public double[] addrToCoords(String ad) throws Exception;
}
