package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter @Setter
@Table(name = "wishlist_t", schema = "bloom")
public class WishList {

    @Id @GeneratedValue
    @Column(name = "wish_id")
    private int wishId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "shop_number")
    private Shop shop;

}
