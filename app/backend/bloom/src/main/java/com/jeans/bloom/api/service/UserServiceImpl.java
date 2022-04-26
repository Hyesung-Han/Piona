package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.UserReq;
import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;


    @Override
    public User createUser(UserReq registerInfo) {
        User user = new User();
        user.setUserId(registerInfo.getUser_id());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(registerInfo.getPassword());
        user.setName(registerInfo.getName());
        user.setPhone(registerInfo.getPhone());
        return userRepository.save(user);

    }
}
