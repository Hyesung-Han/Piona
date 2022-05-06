package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ShopInfoReq;
import com.jeans.bloom.api.request.UserLoginPostReq;
import com.jeans.bloom.api.request.UserRegiPostReq;
import com.jeans.bloom.api.response.UserListRes;
import com.jeans.bloom.api.response.UserRes;
import com.jeans.bloom.common.util.JwtTokenUtil;
import com.jeans.bloom.db.entity.CertificationNum;
import com.jeans.bloom.db.entity.Shop;
import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.entity.type.StatusType;
import com.jeans.bloom.db.entity.type.UserCode;
import com.jeans.bloom.db.repository.CertifiedRepository;
import com.jeans.bloom.db.repository.ShopRepository;
import com.jeans.bloom.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private ShopRepository shopRepository;

    @Autowired
    private CertifiedRepository certifiedRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * OYT | 2022.04.27
     * @name createUser
     * @des 가입 정보로 회원 가입 진행
     */
    @Override
    public User createUser(UserRegiPostReq registerInfo) throws Exception{
        User user = new User();
        user.setUserId(registerInfo.getUser_id());

        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(passwordEncoder.encode(registerInfo.getPassword()));
        user.setName(registerInfo.getName());
        user.setPhone(registerInfo.getPhone());
        user.setUserCode(UserCode.S);
        Shop shop = new Shop();
        shop.setShopNumber(registerInfo.getShop_number());
        shop.setUser(user);
        User userSave = userRepository.save(user);
        shopRepository.save(shop);

        return userSave;
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

    @Override
    public Shop findShopByShopNumber(String shopNumber) throws Exception {
        return shopRepository.findShopByShopNumber(shopNumber);
    }

    /**
     * OYT | 2022.04.27
     * @name login
     * @des 아이디, 비밀번호를 입력받아 일치하면 회원의 정보를 리턴해주는 메소드
     */
    @Override
    public User login(UserLoginPostReq userLogin) throws Exception {
        String userId = userLogin.getUser_id();
        String userPassword = userLogin.getPassword();

            User user = this.findUserByUserId(userId);

            // 탈퇴한 회원 로그인 x
            if(!user.getIsDel().equals(StatusType.N)){
                return null;
            }

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
        String userId = userCheck.getUser_id();
        String userPassword = userCheck.getPassword();

        User user = this.findUserByUserId(userId);
        if(passwordEncoder.matches(userPassword, user.getPassword())){
            return user;
        }
        return null;
    }

    /**
     * OYT | 2022.04.27
     * @name findUserByPhone
     * @des 회원 핸드폰 번호를 입력받아 회원의 정보를 리턴해주는 메소드
     */
    @Override
    public User findUserByPhone(String phone) throws Exception {
        return userRepository.findUserByPhone(phone);
    }

    /**
     * OYT | 2022.04.28
     * @name deleteUser
     * @des 회원 ID를 입력받아 회원의 탈퇴 여부를 변경하는 메소드
     */
    @Override
    public User deleteUser(String userId, StatusType statusType) throws Exception {

        User user = this.findUserByUserId(userId);
        user.setIsDel(statusType);

        return userRepository.save(user);
    }

    /**
     * OYT | 2022.04.28
     * @name saveCertification
     * @des 핸드폰번호를 통한 인증번호 전송시 DB에 저장하는 메서드
     */
    @Override
    public CertificationNum saveCertification(String phoneNumber, int randomNum) throws Exception {

        CertificationNum certificationNum = new CertificationNum();
        certificationNum.setPhoneNumber(phoneNumber);
        certificationNum.setRandomNum(randomNum);

        return certifiedRepository.save(certificationNum);
    }

    /**
     * OYT | 2022.04.28
     * @name findTop1ByPhoneNumberOrderByIdDesc
     * @des 인증번호를 입력받아 확인하는 메서드, 여러번 인증시 마지막 인증번호를 가져온다.
     */
    @Override
    public boolean findTop1ByPhoneNumberOrderByIdDesc(String phoneNumber, int certifiedNum) throws Exception {
        CertificationNum certificationInfo = certifiedRepository.findTop1ByPhoneNumberOrderByIdDesc(phoneNumber);

        if(certificationInfo.getRandomNum() == certifiedNum){
            return true;
        }
        return false;

    }

    @Override
    public Shop updateShopInfoSave(ShopInfoReq shopInfoReq) throws Exception {
        Shop shop = shopRepository.findShopByShopNumber(shopInfoReq.getShop_number());
        shop.setTel(shopInfoReq.getTel());
        shop.setHours(shopInfoReq.getHours());
        shop.setZipCode(shopInfoReq.getZip_code());
        shop.setAddress(shopInfoReq.getAddress());
        shop.setDetailAddress(shopInfoReq.getDetail_address());
        shop.setName(shopInfoReq.getName());
        shop.setDescription(shopInfoReq.getDescription());
        shop.setUrl(shopInfoReq.getUrl());
        shop.setImageUrl(shopInfoReq.getImage_url());
        shop.setShopLat(shopInfoReq.getShop_lat());
        shop.setShopLng(shopInfoReq.getShop_lng());

        return shopRepository.save(shop);
    }

    @Override
    public List<UserListRes> findUserByUserCodeAndIsDelNot(UserCode a) throws Exception {
        Optional<List<User>>  optionalUsers = userRepository.findUserByUserCodeAndIsDelNot(a, StatusType.Y);
        return optionalUsers.map(users -> users.stream().map(user -> UserListRes.of(user)).collect(Collectors.toList())).orElse(null);
    }

}
