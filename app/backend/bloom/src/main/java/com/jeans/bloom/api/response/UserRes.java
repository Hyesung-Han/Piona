package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.entity.type.UserCode;
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
    String nickname;
    String phone;
    String access_token;
    String refresh_token;
    UserCode user_code;

    public static UserRes of(User user){
        return UserRes.builder()
                .user_id(user.getUserId())
                .name(user.getName())
                .nickname(user.getNickName())
                .phone(user.getPhone())
                .access_token(user.getAccessToken())
                .refresh_token(user.getRefreshToken())
                .user_code(user.getUserCode())
                .build();
    }
}
