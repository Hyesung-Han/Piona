package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.db.entity.Reservation;
import com.jeans.bloom.db.repository.PicnicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * LJA | 2022.04.28
 * @name PicnicServiceImpl
 * @des 피크닉 API 사용을 위한 Service
 */
@Service
public class PicnicServiceImpl implements PicnicService{

    @Autowired
    private PicnicRepository picnicRepository;

    /**
     * LJA | 2022.04.28
     * @name findReservationsByUser_UserId
     * @des 회원 아이디를 입력받아 회원의 전체 예약리스트을 리턴해주는 메소드
     */
    @Override
    public List<ReservationRes> findReservationsByUser_UserId(String userId) throws Exception {
        Optional<List<Reservation>> optionalReservations = picnicRepository.findReservationsByUser_UserId(userId);
        return optionalReservations.map(reservations -> reservations.stream().map(reservation -> ReservationRes.of(reservation)).collect(Collectors.toList())).orElse(null);
    }
}
