package com.jeans.bloom.api.response;

import com.jeans.bloom.common.util.JwtTokenUtil;
import com.jeans.bloom.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * OYT | 2022.04.27
 * @name UserRes
 * @des 회원 정보를 리턴하기 위한 DTO
 */
@Getter
@Setter
@Builder
public class UserRes {

    String user_id;
    String name;
    String nickName;
    String phone;
    String accessToken;
    String refreshToken;

    public static UserRes of(User user){
        return UserRes.builder()
                .user_id(user.getUserId())
                .name(user.getName())
                .nickName(user.getNickName())
                .phone(user.getPhone())
                .accessToken(user.getAccessToken())
                .refreshToken(user.getRefreshToken())
                .build();
    }
}
