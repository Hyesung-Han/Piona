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
    int cart_id;
    int item_id;
    String item_name;
    int price;
    String image_url;
    int quantity;
    int total_quantity;
    LocalDateTime reservation_date;
    String shop_name;
    String shop_number;

    public static CartRes of(Cart cart) {
        return CartRes.builder()
                .cart_id(cart.getCartId())
                .item_id(cart.getItem().getItemId())
                .item_name(cart.getItem().getName())
                .price(cart.getItem().getPrice())
                .image_url(cart.getItem().getImageUrl())
                .quantity(cart.getQuantity())
                .total_quantity(cart.getItem().getTotalQuantity())
                .reservation_date(cart.getReservationDate())
                .shop_name(cart.getItem().getShop().getName())
                .shop_number(cart.getItem().getShop().getShopNumber())
                .build();
    }
}
