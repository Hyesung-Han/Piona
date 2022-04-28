package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Review;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * LJA | 2022.04.28
 * @name ReviewDetailRes
 * @des 리뷰와 리뷰 코멘트를 리턴하기 위한 DTO
 */
@Getter @Setter
@Builder
@ApiModel("ReviewDetailResponse")
public class ReviewDetailRes {
    int review_id;
    int reservation_id;
    String nickname;
    String image_url;
    String content;
    int score;
    String shop_name;
    LocalDateTime created_at;
    String kw_reasonable;
    String kw_mood;
    String kw_clean;
    String kw_adorable;
    String kw_various;
    String kw_kind;
    String comment;

    public static ReviewDetailRes of(Review review) {
        String reviewComment = "";
        if(review.getReviewComment()!=null) {
            reviewComment = review.getReviewComment().getContent();
        }
        return ReviewDetailRes.builder()
                .review_id(review.getReviewId())
                .reservation_id(review.getReservation().getReservationId())
                .nickname(review.getUser().getNickname())
                .image_url(review.getImageUrl())
                .content(review.getContent())
                .score(review.getScore())
                .shop_name(review.getReservation().getShop().getName())
                .created_at(review.getCreatedAt())
                .kw_reasonable(review.getKwReasonable())
                .kw_mood(review.getKwMood())
                .kw_clean(review.getKwClean())
                .kw_adorable(review.getKwAdorable())
                .kw_various(review.getKwVarious())
                .kw_kind(review.getKwKind())
                .comment(reviewComment)
                .build();
    }
}
