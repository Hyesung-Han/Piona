package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Cart;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * LJA | 2022.04.27
 * @name CartRes
 * @des 회원 장바구니 아이템을 리턴하기 위한 DTO
 */
@Getter @Setter
@Builder
@ApiModel("CartListItemResponse")
public class CartRes {
    int cartId;
    int itemId;
    String itemName;
    int price;
    String imageUrl;
    int quantity;
    LocalDateTime reservationDate;
    String shopName;

    public static CartRes of(Cart cart) {
        return CartRes.builder()
                .cartId(cart.getCartId())
                .itemId(cart.getItem().getItemId())
                .itemName(cart.getItem().getName())
                .price(cart.getItem().getPrice())
                .imageUrl(cart.getItem().getImageUrl())
                .quantity(cart.getQuantity())
                .reservationDate(cart.getReservationDate())
                .shopName(cart.getItem().getShop().getName())
                .build();
    }
}
