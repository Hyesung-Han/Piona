package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ReservationRes;

import java.util.List;

public interface PicnicService {

    List<ReservationRes> findReservationsByUser_UserId(String userId) throws Exception;
}
