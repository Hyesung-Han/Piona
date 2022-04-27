package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.UserLoginPostReq;
import com.jeans.bloom.api.request.UserRegiPostReq;
import com.jeans.bloom.api.response.UserRes;
import com.jeans.bloom.db.entity.User;

public interface UserService {
    User createUser(UserRegiPostReq registerInfo);

    User getUserByUserId(String userId);

    User getUserByUserNickname(String nickName);

    User login(UserLoginPostReq userLogin);
}
