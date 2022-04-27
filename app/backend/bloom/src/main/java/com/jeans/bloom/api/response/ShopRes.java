package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Shop;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
@Builder
public class ShopRes {

    String shopNumber;
    String tel;
    String hours;
    Integer zipCode;
    String address;
    String name;
    String description;
    String url;
    String imageUrl;
    BigDecimal shopLng;
    BigDecimal shopLat;

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
                .shopNumber(shop.getShopNumber())
                .tel(shop.getTel())
                .hours(shop.getHours())
                .zipCode(shop.getZipCode())
                .address(shop.getAddress()+" "+shop.getDetailAddress())
                .name(shop.getName())
                .description(shop.getDescription())
                .url(shop.getUrl())
                .imageUrl(shop.getImageUrl())
                .shopLng(shop.getShopLng())
                .shopLat(shop.getShopLat())
                .build();
    }

}
