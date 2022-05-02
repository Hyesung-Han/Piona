package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Shop;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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
    double score;
    int review_cnt;

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

    public static ShopRes of(ShopRes shop, double avg, int count){
        /**
         * HHS | 2022.05.02
         * @name ShopRes
         * @des 가게 번호를 이용하여 해당 가게의 별점 평균과 리뷰 개수를 조회
         */

        return ShopRes.builder()
                .shop_number(shop.getShop_number())
                .tel(shop.getTel())
                .hours(shop.getHours())
                .zip_code(shop.getZip_code())
                .address(shop.getAddress())
                .name(shop.getName())
                .description(shop.getDescription())
                .url(shop.getUrl())
                .image_url(shop.getImage_url())
                .shop_lng(shop.getShop_lng())
                .shop_lat(shop.getShop_lat())
                .score(avg)
                .review_cnt(count)
                .build();
    }




}
