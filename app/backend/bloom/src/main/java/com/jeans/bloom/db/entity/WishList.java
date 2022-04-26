package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Table(name = "wishlist_t", schema = "bloom")
public class WishList {

    @Id @GeneratedValue
    @Column(name = "wish_id")
    private int wishId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "shop_number")
    private String shopNumber;

}
