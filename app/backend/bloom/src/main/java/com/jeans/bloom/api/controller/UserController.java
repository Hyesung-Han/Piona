package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.UserLoginPostReq;
import com.jeans.bloom.api.request.UserRegiPostReq;
import com.jeans.bloom.api.response.UserRes;
import com.jeans.bloom.api.service.UserService;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * OYT | 2022.04.27
 * @name UserController
 * @des 유저 API 사용을 위한 Controller
 */

@Api(value = "유저 API", tags = {"User"})
@RequestMapping("/api/user")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * OYT | 2022.04.27
     * @name register
     * @api {post} /user/sinnup
     * @des 회원 정보를 입력받아 회원가입
     */
    @PostMapping("/signup")
    @ApiOperation(value = "회원 가입", notes = "회원정보를 입력 후 를 통해 회원가입 한다. 아이디, 닉네임, 핸드폰 번호는 중복이 될 수 없다.")
    public ResponseEntity<BaseResponseBody> register(
            @RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegiPostReq registerInfo) {

        User userGetByUserId = userService.getUserByUserId(registerInfo.getUserId());
        User userGetByNickname = userService.getUserByUserNickname(registerInfo.getNickName());

        if(userGetByUserId != null){
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", "중복된 아이디입니다.."));
        }else if(userGetByNickname != null){
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", "중복된 닉네임입니다."));
        }else{
            userService.createUser(registerInfo);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        }
    }

    /**
     * OYT | 2022.04.27
     * @name login
     * @api {post} /user/signin
     * @des 아이디, 패스워드를 받아 로그인
     */
    @PostMapping("/signin")
    @ApiOperation(value = "로그인", notes = "아이디 비밀번호를 입력후 로그인.")
    public ResponseEntity<BaseResponseBody> login(
            @RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq userLogin) {

        User userLoginPostRes = userService.login(userLogin);
        if(userLoginPostRes != null){
            return ResponseEntity.status(200).body(BaseResponseBody.of("success", UserRes.of(userLoginPostRes)));
        }else{
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", "정보가 올바르지 않습니다."));
        }
    }
}
