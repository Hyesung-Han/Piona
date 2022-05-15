package com.jeans.bloom.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * OYT | 2022.05.06
 * @name ReservationReq
 * @des 예약 정보 Request DTO
 */
@Getter @Setter
@ApiModel("ReservationReq")
public class ReservationReq {

    String user_id;
    String shop_number;
    int total_price;
    List<ReservationDetailReq> reservationDetailList;

}
