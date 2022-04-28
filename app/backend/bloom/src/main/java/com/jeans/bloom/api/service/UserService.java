package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.UserLoginPostReq;
import com.jeans.bloom.api.request.UserRegiPostReq;
import com.jeans.bloom.api.response.UserRes;
import com.jeans.bloom.db.entity.User;

public interface UserService {
    User createUser(UserRegiPostReq registerInfo) throws Exception;

    User findUserByUserId(String userId) throws Exception;

    User findUserByNickName(String nickName) throws Exception;

    User login(UserLoginPostReq userLogin) throws Exception;

    User passwordCheck(UserLoginPostReq userCheck) throws Exception;
}
