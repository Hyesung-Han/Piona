package com.jeans.bloom.api.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jeans.bloom.db.entity.Item;
import com.jeans.bloom.db.entity.ReservationDetail;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter  @Setter
@Builder
@ApiModel("ItemRes")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ItemRes {

    Integer item_id;
    String item_name;
    Integer price;
    Integer quantity;
    String  description;
    String  image_url;
    int total_quantity;
    String shop_number;

    public static ItemRes of(Item item){
        /**
         * HHS | 2022.04.28
         * @name ItemRes
         * @des 가게 번호를 이용하여 해당 가게의 상품 목록을 조회
         */
        return ItemRes.builder()
                .item_id(item.getItemId())
                .item_name(item.getName())
                .price(item.getPrice())
                .description(item.getDescription())
                .image_url(item.getImageUrl())
                .total_quantity(item.getTotalQuantity())
                .shop_number(item.getShop().getShopNumber())
                .build();
    }

    /**
     * LJA | 2022.04.28
     * @name of
     * @des reservationDetail 데이터를 이용해 ItemDetail을 가져오기 위한 DTO
     */
    public static ItemRes of(ReservationDetail reservationDetail) {
        return ItemRes.builder()
                .item_id(reservationDetail.getItem().getItemId())
                .item_name(reservationDetail.getItem().getName())
                .quantity(reservationDetail.getQuantity())
                .price(reservationDetail.getItem().getPrice())
                .image_url(reservationDetail.getItem().getImageUrl())
                .build();
    }

}
