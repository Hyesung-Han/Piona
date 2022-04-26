package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="user_t", schema = "bloom")
@Getter @Setter
public class User {

    @Id
    @Column(name = "user_id", length = 45)
    private String userId;

    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "nickname", length = 45)
    private String nickname;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "is_del", length = 1)
    private String isDel;

    @Column(name = "user_code", length = 1)
    private String userCode;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Alarm> alarms = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<WishList> wishLists = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    @OneToOne(mappedBy = "user", fetch = LAZY, cascade = CascadeType.ALL)
    private Shop shop;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Cart> carts = new ArrayList<>();

}
