package com.jeans.bloom.api.request;

import com.jeans.bloom.db.entity.Shop;
import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.entity.WishList;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * HHS | 2022.04.28
 * @name WishListReq
 * @des 위시리스트 Request DTO
 */

@Getter
@Setter
@ToString
@ApiModel("WishListRequest")
public class WishListReq {
    String user_id;
    String shop_number;

    public WishList toWishList(){
        WishList wishList = new WishList();

        User user = new User();
        user.setUserId(this.user_id);

        Shop shop = new Shop();
        shop.setShopNumber(this.shop_number);

        wishList.setUser(user);
        wishList.setShop(shop);

        return wishList;

    }

}
