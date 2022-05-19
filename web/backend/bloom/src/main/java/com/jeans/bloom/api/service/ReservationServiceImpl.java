package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.db.entity.Reservation;
import com.jeans.bloom.db.entity.type.OrderStatus;
import com.jeans.bloom.db.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * LJA | 2022.05.08
 * @name ReservationServiceImpl
 * @des 기업페이지에서 예약 관련 처리를 위한 서비스 구현 정의
 */
@Service
public class ReservationServiceImpl implements ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    /**
     * LJA | 2022.05.08
     * @name getReview
     * @des 가게 사업자번호를 통해 전체 예약현황을 조회하는 메소드
     */
    @Override
    public List<ReservationRes> findReservationsByShop_ShopNumber(String shopNumber) throws Exception {
        List<Reservation> reservationResList = reservationRepository.findReservationsByShop_ShopNumber(shopNumber).orElse(null);
        return reservationResList.stream().map(reservation -> ReservationRes.of(reservation)).collect(Collectors.toList());
    }

    /**
     * LJA | 2022.05.08
     * @name ReservationController
     * @api {patch} /reservation
     * @des 예약의 OrderStatus를 변경해주는 메소드
     */
    @Override
    public void changeOrderStatus(int reservationId, OrderStatus status) throws Exception {
        Reservation reservation = reservationRepository.getOne(reservationId);
        if(reservation != null) {
            reservation.setStatus(status);
            reservationRepository.save(reservation);
        }
    }
}
