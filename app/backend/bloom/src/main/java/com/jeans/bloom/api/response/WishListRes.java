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
    String shopNumber;
    String name;
    String imageUrl;
    String address;
//    Integer score;
    Integer wish;

    /**
     * TODO
     * score 추가하기 -> reservation, review 만들어지고 난 후에 하기
     * */

    public static WishListRes of(WishList wishList){
        /**
         * HHS | 2022.04.28
         * @name WishListRes
         * @des user_id를 이용하여 위시리스트 목록 보기
         */

        return WishListRes.builder()
                .shopNumber(wishList.getShop().getShopNumber())
                .name(wishList.getShop().getName())
                .imageUrl(wishList.getShop().getImageUrl())
                .address(wishList.getShop().getAddress()+" "+wishList.getShop().getDetailAddress())
//                .score(wishList.getShop().getReservations().getReview().getScore())
                .wish(wishList.getWishId())
                .build();
    }

}
