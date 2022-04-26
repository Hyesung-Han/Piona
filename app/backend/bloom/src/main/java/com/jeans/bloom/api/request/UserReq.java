package com.jeans.bloom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserReq {

    @ApiModelProperty(name="유저 ID", example="bloom_app")
    String user_id;
    @ApiModelProperty(name="유저 Password", example="user_password")
    String password;

    String phone;

    String name;
}
