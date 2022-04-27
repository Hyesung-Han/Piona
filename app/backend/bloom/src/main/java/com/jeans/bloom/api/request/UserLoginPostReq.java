package com.jeans.bloom.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class UserLoginPostReq {

    String userId;
    String password;

}
