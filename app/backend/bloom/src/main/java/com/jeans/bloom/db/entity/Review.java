package com.jeans.bloom.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter @Setter
@Table(name = "review_t", schema = "bloom")
public class Review {

    @Id @GeneratedValue
    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "reservation_id")
    private int reservationId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "content")
    private String content;

    @Column(name = "score")
    private int score;

    @Column(name = "is_ban")
    private String isBan;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "kw_reasonable")
    private String kwReasonable;

    @Column(name = "kw_mood")
    private String kwMood;

    @Column(name = "kw_clean")
    private String kwClean;

    @Column(name = "kw_adorable")
    private String kwAdorable;

    @Column(name = "kw_various")
    private String kwVarious;

    @Column(name = "kw_kind")
    private String kwKind;

}
