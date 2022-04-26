package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "cart_t", schema = "bloom")
public class Cart {

    @Id @GeneratedValue
    @Column(name = "cart_id")
    private int cartId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "shop_number")
    private String shopNumber;

    @Column(name = "item_id")
    private int itemId;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "reservation_date")
    private LocalDateTime reservationDate;
}
