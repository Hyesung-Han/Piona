package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.db.entity.type.OrderStatus;

import java.util.List;

public interface ReservationService {
    List<ReservationRes> findReservationsByShop_ShopNumber(String shopNumber) throws Exception;

    void changeOrderStatus(int reservationId, OrderStatus status) throws Exception;

    void changeAllOrderStatusToDone() throws Exception;
}
