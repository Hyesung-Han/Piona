package com.jeans.bloom.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.*;

/**
 * HHS | 2022.05.07
 * @name ItemInfoReq
 * @des 상품 수정 Request DTO
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ItemInfoReq")
public class ItemInfoReq {

    //    @ApiParam(value = "상품 번호")
    int item_id;
    //    @ApiParam(value = "상품 이름")
    String name;
    //    @ApiParam(value = "상품 가격")
    int price;
    //    @ApiParam(value = "상품 재고 수량")
    int total_quantity;
    //    @ApiParam(value = "상품 설명")
    String description;
    //    @ApiParam(value = "상품 대표 이미지")
    String image_url;

}
