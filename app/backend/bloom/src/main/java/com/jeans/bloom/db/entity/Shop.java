package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@Table(name = "shop_t", schema = "bloom")
public class Shop {

    @Id @GeneratedValue
    @Column(name = "shop_number")
    private String shopNumber;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "tel")
    private String tel;

    @Column(name = "hours")
    private String hours;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "address")
    private String address;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "url;")
    private String url;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "shop_lng")
    private String shopLng;

    @Column(name = "shop_lat")
    private String shopLat;

}
