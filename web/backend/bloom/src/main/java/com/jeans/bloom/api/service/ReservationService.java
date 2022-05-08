package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ReservationRes;

import java.util.List;

public interface ReservationService {
    List<ReservationRes> findReservationsByShop_ShopNumber(String shop_number) throws Exception;
}
