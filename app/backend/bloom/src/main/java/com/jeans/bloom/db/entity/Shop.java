package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter @Setter
@Table(name = "shop_t", schema = "bloom")
public class Shop {

    @Id
    @Column(name = "shop_number", length = 10)
    private String shopNumber;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "tel", length = 45)
    private String tel;

    @Column(name = "hours", length = 1000)
    private String hours;

    @Column(name = "zip_code")
    private int zipCode;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "detail_address", length = 200)
    private String detailAddress;

    @Column(name = "name", length = 70)
    private String name;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "url", length = 300)
    private String url;

    @Column(name = "image_url", length = 1500)
    private String imageUrl;

    @Column(name = "shop_lng")
    private BigDecimal shopLng;

    @Column(name = "shop_lat")
    private BigDecimal shopLat;

    @OneToMany(mappedBy = "shop", cascade = CascadeType.REMOVE)
    private List<WishList> wishLists = new ArrayList<>();

    @OneToMany(mappedBy = "shop")
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "shop", cascade = CascadeType.REMOVE)
    private List<Item> items = new ArrayList<>();

    @OneToMany(mappedBy = "shop", cascade = CascadeType.REMOVE)
    private List<Cart> carts = new ArrayList<>();
}
