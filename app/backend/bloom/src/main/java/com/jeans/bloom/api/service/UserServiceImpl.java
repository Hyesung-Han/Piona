package com.jeans.bloom.api.service;

import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;


    @Override
    public User createUser(User registerInfo) {
        User user = new User();
        user.setUserId(registerInfo.getUserId());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(registerInfo.getPassword());
        return userRepository.save(user);

    }
}
