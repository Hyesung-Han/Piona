package com.jeans.bloom.api.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jeans.bloom.db.entity.Item;
import com.jeans.bloom.db.entity.ReservationDetail;
import com.jeans.bloom.db.entity.Review;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * HHS | 2022.05.06
 * @name ItemRes
 * @des 상품 정보를 리턴하기 위한 DTO
 */
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ItemRes {

    int item_id;
    String shop_number;
    String name;
    int price;
    int total_quantity;
    String description;
    String image_url;

    public static ItemRes of(Item item){
        return ItemRes.builder()
                .item_id(item.getItemId())
                .shop_number(item.getShop().getShopNumber())
                .name(item.getName())
                .price(item.getPrice())
                .total_quantity(item.getTotalQuantity())
                .description(item.getDescription())
                .image_url(item.getImageUrl())
                .build();
    }

    /**
     * LJA | 2022.05.08
     * @name ItemRes of(ReservationDetail reservationDetail)
     * @des ReservationDetail 데이터를 이용해 ItemDetail을 가져오기 위한 DTO
     */
    public static ItemRes of(ReservationDetail reservationDetail){
        return ItemRes.builder()
                .item_id(reservationDetail.getItem().getItemId())
                .name(reservationDetail.getItem().getName())
                .total_quantity(reservationDetail.getQuantity())
                .price(reservationDetail.getItem().getPrice())
                .build();
    }
}
