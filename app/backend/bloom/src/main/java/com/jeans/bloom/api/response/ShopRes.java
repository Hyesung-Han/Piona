package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Shop;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
@Builder
public class ShopRes {

    String shop_number;
    String tel;
    String hours;
    Integer zip_code;
    String address;
    String name;
    String description;
    String url;
    String image_url;
    BigDecimal shop_lng;
    BigDecimal shop_lat;

    /**
     * TODO
     * score, review_cnt 추가
     */

    public static ShopRes of(Shop shop){
        /**
         * HHS | 2022.04.27
         * @name ShopRes
         * @des 가게 번호를 이용하여 해당 가게의 상세 정보를 조회
         */
        return ShopRes.builder()
                .shop_number(shop.getShopNumber())
                .tel(shop.getTel())
                .hours(shop.getHours())
                .zip_code(shop.getZipCode())
                .address(shop.getAddress()+" "+shop.getDetailAddress())
                .name(shop.getName())
                .description(shop.getDescription())
                .url(shop.getUrl())
                .image_url(shop.getImageUrl())
                .shop_lng(shop.getShopLng())
                .shop_lat(shop.getShopLat())
                .build();
    }

}
