package com.jeans.bloom.api.response;

import com.jeans.bloom.common.util.JwtTokenUtil;
import com.jeans.bloom.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@Builder
public class UserRes {

    String user_id;
    String phone;
    String name;
    String nickName;
    String accessToken;
    String refreshToken;

    public static UserRes of(User user){
        return UserRes.builder()
                .user_id(user.getUserId())
                .phone(user.getPhone())
                .name(user.getName())
                .name(user.getNickname())
                .accessToken(user.getAccessToken())
                .refreshToken(user.getRefreshToken())
                .build();
    }
}
