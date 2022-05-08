package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Item;
import com.jeans.bloom.db.entity.Reservation;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
@Builder
@ApiModel("ReservationRes")
public class ReservationRes {
    int reservation_id;
    String user_id;
    String name;
    String phone;
    int total_price;
    LocalDateTime order_date;
    List<ItemRes> detail;

    public static ReservationRes of(Reservation reservation){
        return ReservationRes.builder()
                .reservation_id(reservation.getReservationId())
                .user_id(reservation.getUser().getUserId())
                .name(reservation.getUser().getName())
                .phone(reservation.getUser().getPhone())
                .total_price(reservation.getTotalPrice())
                .order_date(reservation.getOrderDate())
                .detail(reservation.getReservationDetails().stream().map(detail -> ItemRes.of(detail)).collect(Collectors.toList()))
                .build();
    }
}
