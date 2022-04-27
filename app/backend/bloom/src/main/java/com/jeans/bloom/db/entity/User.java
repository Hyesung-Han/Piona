package com.jeans.bloom.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jeans.bloom.db.entity.type.StatusType;
import com.jeans.bloom.db.entity.type.UserCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="user_t", schema = "bloom")
@Getter @Setter
@DynamicInsert
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

    @Enumerated(EnumType.STRING)
    @Column(name = "is_del", length = 1)
    private StatusType isDel;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_code", length = 1)
    private UserCode userCode;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "access_token", length = 255)
    private String accessToken;

    @Column(name = "refresh_token", length = 255)
    private String refreshToken;

    @JsonIgnore
//    @JsonManagedReference
    @OneToMany(mappedBy = "user" , orphanRemoval = true)
    private List<Alarm> alarms = new ArrayList<>();

    @OneToMany(mappedBy = "user" )
    private List<WishList> wishLists = new ArrayList<>();

    @OneToMany(mappedBy = "user" )
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user" )
    private List<Reservation> reservations = new ArrayList<>();

    @OneToOne(mappedBy = "user", fetch = LAZY )
    private Shop shop;

    @OneToMany(mappedBy = "user" )
    private List<Cart> carts = new ArrayList<>();

}
