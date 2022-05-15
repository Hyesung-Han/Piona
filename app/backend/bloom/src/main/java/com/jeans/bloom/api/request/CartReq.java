package com.jeans.bloom.api.request;

import com.jeans.bloom.db.entity.Cart;
import com.jeans.bloom.db.entity.Item;
import com.jeans.bloom.db.entity.Shop;
import com.jeans.bloom.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * LJA | 2022.04.28
 * @name CartReq
 * @des 회원 장바구니 아이템 Request DTO
 */
@Getter @Setter
@Builder
@ApiModel("CartItemRequest")
public class CartReq {
    String userId;
    String shopNumber;
    int itemId;
    int quantity;
    LocalDateTime reservationDate;

    public Cart toCart() {
        Cart cart = new Cart();
        User user = new User();
        user.setUserId(this.userId);
        Shop shop = new Shop();
        shop.setShopNumber(this.shopNumber);
        Item item = new Item();
        item.setItemId(this.itemId);

        cart.setUser(user);
        cart.setShop(shop);
        cart.setItem(item);
        cart.setQuantity(this.quantity);
        cart.setReservationDate(this.reservationDate);

        return cart;
    }
}