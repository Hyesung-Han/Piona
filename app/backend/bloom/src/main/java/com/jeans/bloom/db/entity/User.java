package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="user_t", schema = "bloom")
@Getter @Setter
public class User {

    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "phone")
    private String phone;

    @Column(name = "is_del", length = 1)
    private String isDel;

    @Column(name = "user_code")
    private String userCode;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
