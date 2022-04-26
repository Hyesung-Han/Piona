package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Table(name = "reservation_t", schema = "bloom")
public class Reservation {

    @Id @GeneratedValue
    @Column(name = "reservation_id")
    private int reservationId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "shop_number")
    private String shopNumber;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

}
