package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Shop;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class ShopRes {

    String shop_number;
    String tel;
    String hours;
    Integer zip_code;
    String address;
    String detail_address;
    String name;
    String description;
    String url;
    String image_url;

    public static ShopRes of(Shop shop){
        return ShopRes.builder()
                .shop_number(shop.getShopNumber())
                .tel(shop.getTel())
                .hours(shop.getHours())
                .zip_code(shop.getZipCode())
                .address(shop.getAddress())
                .detail_address(shop.getDetailAddress())
                .name(shop.getName())
                .description(shop.getDescription())
                .url(shop.getUrl())
                .image_url(shop.getImageUrl())
                .build();
    }
}
