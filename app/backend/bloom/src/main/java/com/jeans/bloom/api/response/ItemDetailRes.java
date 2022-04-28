package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.ReservationDetail;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * LJA | 2022.04.28
 * @name ItemDetailRes
 * @des 아이템 상세정보를 리턴하기 위한 DTO
 */
@Getter @Setter
@Builder
@ApiModel("ItemDetailRes")
public class ItemDetailRes {
    int item_id;
    String item_name;
    int quantity;
    int price;
    String description;
    String image_url;

    public static ItemDetailRes of(ReservationDetail reservationDetail) {
        return ItemDetailRes.builder()
                .item_id(reservationDetail.getItem().getItemId())
                .item_name(reservationDetail.getItem().getName())
                .quantity(reservationDetail.getQuantity())
                .price(reservationDetail.getItem().getPrice())
                .description(reservationDetail.getItem().getDescription())
                .image_url(reservationDetail.getItem().getImageUrl())
                .build();
    }
}
