package com.jeans.bloom.api.request;

import com.jeans.bloom.db.entity.type.OrderStatus;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReservationStatusReq {
    int reservation_id;
    OrderStatus status;
}
