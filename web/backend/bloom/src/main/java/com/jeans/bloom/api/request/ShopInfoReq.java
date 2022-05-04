package com.jeans.bloom.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ShopInfoReq")
public class ShopInfoReq {

    @ApiParam(value="사업자 번호")
//    @JsonProperty("shop_number")
    String shop_number;

    @ApiParam(value="가게 전화번호")
//    @JsonProperty("tel")
    String tel;

    @ApiParam(value="운영 시간")
//    @JsonProperty("hours")
    String hours;

    @ApiParam(value="가게 우편번호")
//    @JsonProperty("zip_code")
    Integer zip_code;

    @ApiParam(value="가게 주소")
//    @JsonProperty("address")
    String address;

    @ApiParam(value="가게 상세주소")
//    @JsonProperty("detail_address")
    String detail_address;

    @ApiParam(value="가게 명")
//    @JsonProperty("name")
    String name;

    @ApiParam(value="가게 설명")
//    @JsonProperty("description")
    String description;

    @ApiParam(value="가게 Url")
//    @JsonProperty("url")
    String url;

    @ApiParam(value="가게 대표 이미지 Url")
//    @JsonProperty("image_url")
    String image_url;

    @ApiParam(value="가게 경도")
//    @JsonProperty("shop_lng")
    BigDecimal shop_lng;

    @ApiParam(value="가게 위도")
//    @JsonProperty("shop_lat")
    BigDecimal shop_lat;

}
