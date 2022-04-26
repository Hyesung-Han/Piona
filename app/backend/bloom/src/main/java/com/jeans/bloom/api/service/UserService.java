package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.UserReq;
import com.jeans.bloom.db.entity.User;

public interface UserService {
    User createUser(UserReq registerInfo);
}
