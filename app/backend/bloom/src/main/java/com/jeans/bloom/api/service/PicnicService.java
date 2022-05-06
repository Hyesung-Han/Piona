package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ReservationDetailReq;
import com.jeans.bloom.api.request.ReservationReq;
import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.db.entity.Reservation;

import java.util.List;

public interface PicnicService {

    List<ReservationRes> findReservationsByUser_UserId(String userId) throws Exception;

    void cancleReservation(int reservationId) throws Exception;

    Reservation createReservation(ReservationReq reservationReq) throws Exception;

    void createReservationDetail(Integer reservationId, List<ReservationDetailReq> reservationDetailList) throws Exception;
}
