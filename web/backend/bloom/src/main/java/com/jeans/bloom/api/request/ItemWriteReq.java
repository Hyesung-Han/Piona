package com.jeans.bloom.api.request;

import com.jeans.bloom.db.entity.Item;
import com.jeans.bloom.db.entity.Shop;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


/**
 * HHS | 2022.05.06
 * @name ItemWriteReq
 * @des 상품 등록 Request DTO
 */

@Getter
@Setter
@AllArgsConstructor
@Builder
@ApiModel("ItemWriteReq")
public class ItemWriteReq implements Serializable {

    String shopNumber;
    String name;
    int price;
    int totalQuantity;
    String description;
    @ApiModelProperty(hidden = true)
    String imageUrl="";

    public Item toItem(){

        Item item = new Item();

        Shop shop = new Shop();
        shop.setShopNumber(this.shopNumber);
        item.setShop(shop);

        item.setName(this.name);
        item.setPrice(this.price);
        item.setTotalQuantity(this.totalQuantity);
        item.setDescription(this.description);
        item.setImageUrl(this.imageUrl);

        return item;
    }
}
