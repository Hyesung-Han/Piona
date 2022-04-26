package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Table(name = "reservation_detail_t", schema = "bloom")
public class ReservationDetail {

    @Id @GeneratedValue
    @Column(name = "detail_id")
    private int detailId;

    @Column(name = "reservation_id")
    private int reservationId;

    @Column(name = "item_id")
    private int itemId;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "reservation_date")
    private LocalDateTime reservationDate;

}
