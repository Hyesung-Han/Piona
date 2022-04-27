package com.jeans.bloom.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class UserLoginPostReq {
    @ApiModelProperty(name="유저 ID")
    String userId;
    @ApiModelProperty(name="유저 Password")
    String password;

}
