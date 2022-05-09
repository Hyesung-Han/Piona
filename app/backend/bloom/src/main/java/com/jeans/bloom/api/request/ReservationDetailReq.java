package com.jeans.bloom.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * OYT | 2022.05.06
 * @name ReservationDetailReq
 * @des 예약 상세정보 Request DTO
 */
@Getter @Setter
@ApiModel("ReservationDetailReq")
public class ReservationDetailReq {
    int item_id;
    int quantity;
    LocalDateTime reservation_date;
}
