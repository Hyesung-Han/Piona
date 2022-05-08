package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.api.response.SaleRes;
import com.jeans.bloom.db.entity.type.OrderStatus;

import java.util.List;

public interface SaleService {
    List<SaleRes> getTotalSale(String shopNumber) throws Exception;
}
