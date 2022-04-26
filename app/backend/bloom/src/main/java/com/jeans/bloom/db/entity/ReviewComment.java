package com.jeans.bloom.db.entity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Table(name = "review_comment_t", schema = "bloom")
public class ReviewComment {

    @Id @GeneratedValue
    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
