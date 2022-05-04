package com.jeans.bloom.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class ShopInfoReq {

    @ApiModelProperty(name="사업자 번호")
    String shop_number;

    @ApiModelProperty(name="가게 전화번호")
    String tel;

    @ApiModelProperty(name="운영 시간")
    String hours;

    @ApiModelProperty(name="가게 우편번호")
    Integer zip_code;

    @ApiModelProperty(name="가게 주소")
    String address;

    @ApiModelProperty(name="가게 상세주소")
    String detail_address;

    @ApiModelProperty(name="가게 명")
    String name;

    @ApiModelProperty(name="가게 설명")
    String description;

    @ApiModelProperty(name="가게 Url")
    String url;

    @ApiModelProperty(name="가게 대표 이미지 Url")
    String image_url;

    @ApiModelProperty(name="가게 경도")
    BigDecimal shop_lng;

    @ApiModelProperty(name="가게 위도")
    BigDecimal shop_lat;

}
