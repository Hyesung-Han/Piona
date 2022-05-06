package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Item;
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
}
