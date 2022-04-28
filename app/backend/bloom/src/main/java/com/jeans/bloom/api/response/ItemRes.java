package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemRes {

    Integer itemId;
    String name;
    Integer price;
    String  description;
    String  imageUrl;

    public static ItemRes of(Item item){
        /**
         * HHS | 2022.04.28
         * @name ItemRes
         * @des 가게 번호를 이용하여 해당 가게의 상품 목록을 조회
         */
        return ItemRes.builder()
                .itemId(item.getItemId())
                .name(item.getName())
                .price(item.getPrice())
                .description(item.getDescription())
                .imageUrl(item.getImageUrl())
                .build();
    }

}
