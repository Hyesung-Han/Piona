package com.jeans.bloom.api.request;

import com.jeans.bloom.db.entity.type.OrderStatus;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter @Setter
public class ReservationOrderStatusReq {
    int reservation_id;
    OrderStatus status;
}
