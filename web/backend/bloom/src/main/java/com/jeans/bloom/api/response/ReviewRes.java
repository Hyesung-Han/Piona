package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.type.StatusType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
/**
 * HHS | 2022.05.06
 * @name ReviewRes
 * @des 리뷰 정보를 리턴하기 위한 DTO
 */
@Getter
@Setter
@Builder
public class ReviewRes {

    int review_id;
    int reservation_id;
    String nickname;
    String image_url;
    String content;
    int score;
    StatusType is_ban;
    LocalDateTime created_at;
    String user_id;
    String shop_name;


    public static ReviewRes of(Review review){
        return ReviewRes.builder()
                .review_id(review.getReviewId())
                .reservation_id(review.getReservation().getReservationId())
                .nickname(review.getUser().getNickName())
                .user_id(review.getUser().getUserId())
                .image_url(review.getImageUrl())
                .content(review.getContent())
                .score(review.getScore())
                .is_ban(review.getIsBan())
                .created_at(review.getCreatedAt())
                .shop_name(review.getReservation().getShop().getName())
                .build();
    }

}
