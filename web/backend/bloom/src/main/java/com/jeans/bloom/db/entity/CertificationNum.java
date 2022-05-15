package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "certification_t", schema = "bloom")
public class CertificationNum {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @Column(name = "randomNum")
    private Integer randomNum;

}
