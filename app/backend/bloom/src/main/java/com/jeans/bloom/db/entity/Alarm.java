package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Table(name = "alarm_t", schema = "bloom")
public class Alarm {

    @Id @GeneratedValue
    @Column(name = "alarm_id")
    private int alarmId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "content", length = 100)
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "is_check", length = 1)
    private String isCheck;

}
