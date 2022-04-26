package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Table(name = "item_t", schema = "bloom")
public class Item {

    @Id @GeneratedValue
    @Column(name = "item_id")
    private int itemId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "shop_number")
    private Shop shop;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private int price;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @Column(name = "description")
    private String  description;

    @Column(name = "image_url")
    private String  imageUrl;

    @OneToMany(mappedBy = "item")
    private List<ReservationDetail> reservationDetails = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Cart> carts = new ArrayList<>();

}
