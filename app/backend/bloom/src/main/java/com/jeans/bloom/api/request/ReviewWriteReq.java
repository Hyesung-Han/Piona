package com.jeans.bloom.api.request;

import com.jeans.bloom.db.entity.Reservation;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * LJA | 2022.04.28
 * @name ReviewWriteReq
 * @des 리뷰 작성 Request DTO
 */
@Getter @Setter
@Builder
@ApiModel("ReviewWriteReq")
public class ReviewWriteReq {
    String userid;
    int reservationId;
    String imageUrl;
    String content;
    int score;
    String kwReasonable;
    String kwMood;
    String kwClean;
    String kwAdorable;
    String kwVarious;
    String kwKind;

    public Review toReview() {
        Review review = new Review();

        User user = new User();
        user.setUserId(this.userid);
        review.setUser(user);

        Reservation reservation = new Reservation();
        reservation.setReservationId(this.reservationId);
        review.setReservation(reservation);

        review.setImageUrl(this.imageUrl);
        review.setContent(this.content);
        review.setScore(this.score);
        review.setKwReasonable(this.kwReasonable);
        review.setKwMood(this.kwMood);
        review.setKwClean(this.kwClean);
        review.setKwAdorable(this.kwAdorable);
        review.setKwVarious(this.kwVarious);
        review.setKwKind(this.kwKind);

        return review;
    }
}