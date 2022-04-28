package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.UserLoginPostReq;
import com.jeans.bloom.api.request.UserRegiPostReq;
import com.jeans.bloom.common.util.JwtTokenUtil;
import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * OYT | 2022.04.27
 * @name UserServiceImpl
 * @des 회원 관련 로직처리를 위한 서비스 구현 정의
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * OYT | 2022.04.27
     * @name createUser
     * @des 가입 정보로 회원 가입 진행
     */
    @Override
    public User createUser(UserRegiPostReq registerInfo) throws Exception{
        return saveUserInfo(registerInfo);
    }

    /**
     * OYT | 2022.04.27
     * @name findUserByUserId
     * @des 회원 아이디를 입력받아 회원의 정보를 리턴해주는 메소드
     */
    @Override
    public User findUserByUserId(String userId) throws Exception{
        return userRepository.findUserByUserId(userId);
    }

    /**
     * OYT | 2022.04.27
     * @name findUserByNickname
     * @des 회원 닉네임를 입력받아 회원의 정보를 리턴해주는 메소드
     */
    @Override
    public User findUserByNickName(String nickName) throws Exception{
        return userRepository.findUserByNickName(nickName);
    }

    /**
     * OYT | 2022.04.27
     * @name login
     * @des 아이디, 비밀번호를 입력받아 일치하면 회원의 정보를 리턴해주는 메소드
     */
    @Override
    public User login(UserLoginPostReq userLogin) throws Exception {
        String userId = userLogin.getUserId();
        String userPassword = userLogin.getPassword();

            User user = this.findUserByUserId(userId);

            String accessToken = JwtTokenUtil.getToken(userId);
            String refreshToken = JwtTokenUtil.getRefreshToken();

            if (passwordEncoder.matches(userPassword, user.getPassword())) {
                user.setRefreshToken(refreshToken);
                userRepository.save(user);

                user.setAccessToken(accessToken);
                return user;
            }
            return null;

    }

    /**
     * OYT | 2022.04.28
     * @name passwordCheck
     * @des 아이디, 비밀번호를 입력받아 일치하면 회원의 정보를 확인하는 메서드
     */
    @Override
    public User passwordCheck(UserLoginPostReq userCheck) throws Exception {
        String userId = userCheck.getUserId();
        String userPassword = userCheck.getPassword();

        User user = this.findUserByUserId(userId);
        if(passwordEncoder.matches(userPassword, user.getPassword())){
            return user;
        }
        return null;
    }

    /**
     * OYT | 2022.04.28
     * @name updateUser
     * @des 수정된 회원정보를 입력받아 회원의 정보를 업데이트하는 메서드
     */
    @Override
    public User updateUser(UserRegiPostReq updateUserInfo) throws Exception {
        return saveUserInfo(updateUserInfo);
    }

    /**
     * OYT | 2022.04.28
     * @name saveUserInfo
     * @des 회원정보를 입력받아 DB에 저장하는 메서드
     */
    private User saveUserInfo(UserRegiPostReq saveUserInfo) throws Exception{
        User user = new User();
        user.setUserId(saveUserInfo.getUserId());

        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(passwordEncoder.encode(saveUserInfo.getPassword()));
        user.setName(saveUserInfo.getName());
        user.setPhone(saveUserInfo.getPhone());
        user.setNickName(saveUserInfo.getNickName());
        return userRepository.save(user);
    }
}
