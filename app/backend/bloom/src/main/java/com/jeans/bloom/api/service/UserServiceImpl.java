package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.UserLoginPostReq;
import com.jeans.bloom.api.request.UserRegiPostReq;
import com.jeans.bloom.api.response.UserRes;
import com.jeans.bloom.common.util.JwtTokenUtil;
import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserRegiPostReq registerInfo) {
        User user = new User();
        user.setUserId(registerInfo.getUserId());

        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(passwordEncoder.encode(registerInfo.getPassword()));
        user.setName(registerInfo.getName());
        user.setPhone(registerInfo.getPhone());
        user.setNickname(registerInfo.getNickName());
        return userRepository.save(user);

    }

    @Override
    public User getUserByUserId(String userId) {
        return userRepository.findUserByUserId(userId);
    }

    @Override
    public User getUserByUserNickname(String nickName) {
        return userRepository.findUserByNickname(nickName);
    }

    @Override
    public User login(UserLoginPostReq userLogin) {
        String userId = userLogin.getUserId();
        String userPassword = userLogin.getPassword();

        try {
            User user = this.getUserByUserId(userId);

            String accessToken = JwtTokenUtil.getToken(userId);
            String refreshToken = JwtTokenUtil.getRefreshToken();

            if (passwordEncoder.matches(userPassword, user.getPassword())) {
                System.out.println(passwordEncoder.matches(userPassword, user.getPassword()));
                user.setRefreshToken(refreshToken);
                userRepository.save(user);

                user.setAccessToken(accessToken);
                return user;
            } else {
                return null;
            }
        }catch (NullPointerException e){
            return null;
        }
    }
}
