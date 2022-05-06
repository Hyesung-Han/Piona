package com.jeans.bloom.api.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jeans.bloom.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * OYT | 2022.05.04
 * @name UserRes
 * @des 회원 정보를 리턴하기 위한 DTO
 */
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 데이터 전송 x
public class UserListRes {

    String user_id;
    String name;
    String nickname;
    String phone;
    String is_del;
    LocalDateTime created_at;
    String shop_number;
    String tel;
    String address;
    String shop_name;

    public static UserListRes of(User user){
        if(user.getShop() != null){
            return UserListRes.builder()
                    .user_id(user.getUserId())
                    .name(user.getName())
                    .nickname(user.getNickName())
                    .phone(user.getPhone())
                    .is_del(String.valueOf(user.getIsDel()))
                    .created_at(user.getCreatedAt())
                    .shop_number(user.getShop().getShopNumber())
                    .tel(user.getShop().getTel())
                    .address(user.getShop().getAddress() + " " + user.getShop().getDetailAddress())
                    .shop_name(user.getShop().getName())
                    .build();
        }else{
            return UserListRes.builder()
                    .user_id(user.getUserId())
                    .name(user.getName())
                    .nickname(user.getNickName())
                    .phone(user.getPhone())
                    .is_del(String.valueOf(user.getIsDel()))
                    .created_at(user.getCreatedAt())
                    .build();
        }
    }
}
