package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "alarm_t", schema = "bloom")
public class Alarm {

    @Id @GeneratedValue
    @Column(name = "alarm_id")
    private int alarmId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "is_check")
    private String isCheck;

}
