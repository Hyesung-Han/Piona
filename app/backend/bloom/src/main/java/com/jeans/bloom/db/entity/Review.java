package com.jeans.bloom.db.entity;

import com.jeans.bloom.db.entity.type.StatusType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;


@Entity
@Getter @Setter
@Table(name = "review_t", schema = "bloom")
public class Review {

    @Id @GeneratedValue
    @Column(name = "review_id")
    private int reviewId;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "image_url", length = 1500)
    private String imageUrl;

    @Column(name = "content", length = 255)
    private String content;

    @Column(name = "score")
    private int score;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_ban", length = 1)
    private StatusType isBan;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "kw_reasonable", length = 1)
    private String kwReasonable;

    @Column(name = "kw_mood", length = 1)
    private String kwMood;

    @Column(name = "kw_clean", length = 1)
    private String kwClean;

    @Column(name = "kw_adorable", length = 1)
    private String kwAdorable;

    @Column(name = "kw_various", length = 1)
    private String kwVarious;

    @Column(name = "kw_kind", length = 1)
    private String kwKind;

    @OneToOne(mappedBy = "review", fetch = LAZY, cascade = CascadeType.REMOVE)
    private ReviewComment reviewComment;
}
