package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Reservation;
import com.jeans.bloom.db.entity.type.OrderStatus;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * LJA | 2022.04.28
 * @name ReservationRes
 * @des 회원 예약을 리턴하기 위한 DTO
 */
@Getter @Setter
@Builder
@ApiModel("ReservationRes")
public class ReservationRes {
    int reservation_id;
    String shop_number;
    String shop_name;
    LocalDateTime reservation_date;
    int total_price;
    OrderStatus status;
    List<ItemDetailRes> detail;

    public static ReservationRes of(Reservation reservation) {
        return ReservationRes.builder()
                .reservation_id(reservation.getReservationId())
                .shop_number(reservation.getShop().getShopNumber())
                .shop_name(reservation.getShop().getName())
                .reservation_date(reservation.getReservationDetails().get(0).getReservationDate())
                .total_price(reservation.getTotalPrice())
                .status(reservation.getStatus())
                .detail(reservation.getReservationDetails().stream().map(detail -> ItemDetailRes.of(detail)).collect(Collectors.toList()))
                .build();
    }
}