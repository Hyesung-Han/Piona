package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter @Setter
@Table(name = "reservation_t", schema = "bloom")
public class Reservation {

    @Id @GeneratedValue
    @Column(name = "reservation_id")
    private int reservationId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "shop_number")
    private Shop shop;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 1)
    private OrderStatus status;

    @OneToOne(mappedBy = "reservation", fetch = LAZY)
    private Review review;

    @OneToMany(mappedBy = "reservation")
    private List<ReservationDetail> reservationDetails = new ArrayList<>();
}
