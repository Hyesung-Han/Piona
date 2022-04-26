package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "item_t", schema = "bloom")
public class Item {

    @Id @GeneratedValue
    @Column(name = "item_id")
    private int itemId;

    @Column(name = "shop_number")
    private String shopNumber;

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

}
