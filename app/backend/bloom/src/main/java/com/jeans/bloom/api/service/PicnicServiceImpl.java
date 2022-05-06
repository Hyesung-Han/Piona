package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ReservationDetailReq;
import com.jeans.bloom.api.request.ReservationReq;
import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.db.entity.Reservation;
import com.jeans.bloom.db.entity.ReservationDetail;
import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.entity.type.OrderStatus;
import com.jeans.bloom.db.repository.*;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ReservationDetailRepository reservationDetailRepository;


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

    /**
     * LJA | 2022.04.28
     * @name cancleReservation
     * @des 예약 취소를 위한 메소드로 예약 Status를 C로 변경
     */
    @Override
    public void cancleReservation(int reservationId) throws Exception {
        Reservation reservation = picnicRepository.findReservationByReservationId(reservationId).orElse(null);
        reservation.setStatus(OrderStatus.C);
        picnicRepository.save(reservation);
    }

    /**
     * OYT | 2022.05.06
     * @name createReservation
     * @des 결제완료 후 예약 등록
     */
    @Override
    public Reservation createReservation(ReservationReq reservationReq) throws Exception {

        Reservation reservation = new Reservation();
        reservation.setUser(userRepository.getOne(reservationReq.getUser_id()));
        reservation.setShop(shopRepository.getOne(reservationReq.getShop_number()));
        reservation.setTotalPrice(reservationReq.getTotal_price());
        return picnicRepository.save(reservation);
    }

    /**
     * OYT | 2022.05.06
     * @name createReservationDetail
     * @des 결제완료 후 예약 세부내역 등록
     */
    @Override
    public void createReservationDetail(Integer reservationId, List<ReservationDetailReq> reservationDetailList) throws Exception {
        for (ReservationDetailReq detail : reservationDetailList) {
            ReservationDetail reservationDetail = new ReservationDetail();
            reservationDetail.setReservation(picnicRepository.getOne(reservationId));
            reservationDetail.setItem(itemRepository.findItemByItemId(detail.getItem_id()));
            reservationDetail.setReservationDate(detail.getReservation_date());
            reservationDetail.setQuantity(detail.getQuantity());
            reservationDetailRepository.save(reservationDetail);
        }
    }
}
