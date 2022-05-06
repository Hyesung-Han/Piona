package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ShopInfoReq;
import com.jeans.bloom.api.request.UserLoginPostReq;
import com.jeans.bloom.api.request.UserRegiPostReq;
import com.jeans.bloom.db.entity.CertificationNum;
import com.jeans.bloom.db.entity.Shop;
import com.jeans.bloom.db.entity.User;

public interface UserService {
    User createUser(UserRegiPostReq registerInfo) throws Exception;

    User findUserByUserId(String userId) throws Exception;

    Shop findShopByShopNumber(String shopNumber) throws Exception;

    User login(UserLoginPostReq userLogin) throws Exception;

    User passwordCheck(UserLoginPostReq userCheck) throws Exception;

    User findUserByPhone(String phone) throws Exception;

    User deleteUser(String userId) throws Exception;

    CertificationNum saveCertification(String phoneNumber, int randomNum) throws Exception;

    boolean findTop1ByPhoneNumberOrderByIdDesc(String phoneNumber, int certifiedNum) throws Exception;

    Shop updateShopInfoSave(ShopInfoReq shopInfoReq) throws Exception;
}
