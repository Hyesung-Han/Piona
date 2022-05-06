package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.WishList;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class WishListRes {
    String shop_number;
    String name;
    String image_url;
    String address;
    int wish_id;
    double score;

    public static WishListRes of(WishList wishList){
        /**
         * HHS | 2022.04.28
         * @name WishListRes
         * @des user_id를 이용하여 위시리스트 목록 보기
         */

        return WishListRes.builder()
                .shop_number(wishList.getShop().getShopNumber())
                .name(wishList.getShop().getName())
                .image_url(wishList.getShop().getImageUrl())
                .address(wishList.getShop().getAddress()+" "+wishList.getShop().getDetailAddress())
                .wish_id(wishList.getWishId())
                .build();
    }
   public static WishListRes of(WishList wishList, double avg){
        /**
         * HHS | 2022.05.02
         * @name WishListRes
         * @des user_id를 이용하여 해당 상점의 평균 별점 불러오기
         */

        return WishListRes.builder()
                .shop_number(wishList.getShop().getShopNumber())
                .name(wishList.getShop().getName())
                .image_url(wishList.getShop().getImageUrl())
                .address(wishList.getShop().getAddress()+" "+wishList.getShop().getDetailAddress())
                .wish_id(wishList.getWishId())
                .score(avg)
                .build();
    }

}
