package com.jeans.bloom.api.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jeans.bloom.api.request.FormDataReq;
import com.jeans.bloom.api.request.ShopInfoReq;
import com.jeans.bloom.api.request.UserLoginPostReq;
import com.jeans.bloom.api.request.UserRegiPostReq;
import com.jeans.bloom.api.response.ShopRes;
import com.jeans.bloom.api.response.UserRes;
import com.jeans.bloom.api.service.MessageService;
import com.jeans.bloom.api.service.UserService;
import com.jeans.bloom.common.auth.AwsS3Service;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.CertificationNum;
import com.jeans.bloom.db.entity.Shop;
import com.jeans.bloom.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * OYT | 2022.04.27
 * @name UserController
 * @des 유저 API 사용을 위한 Controller
 */

@Api(value = "유저 API", tags = {"User"})
@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AwsS3Service awsS3Service;
    @Autowired
    private MessageService messageService;

    /**
     * OYT | 2022.05.04
     * @name register
     * @api {post} /user/sinnUp
     * @des 회원 정보를 입력받아 회원가입
     */
    @PostMapping("/signUp")
    @ApiOperation(value = "회원 가입", notes = "회원정보를 입력 후 를 통해 회원가입 한다. 아이디, 닉네임, 핸드폰 번호는 중복이 될 수 없다.")
    public ResponseEntity<BaseResponseBody> register(
            @RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegiPostReq registerInfo) {

        try{
            User userGetByUserId = userService.findUserByUserId(registerInfo.getUser_id());

            if(userGetByUserId != null){
                return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", "중복된 아이디입니다.."));
            }else{
                userService.createUser(registerInfo);
                return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
            }
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }

    }

    /**
     * OYT | 2022.05.04
     * @name login
     * @api {post} /user/signIn
     * @des 아이디, 패스워드를 받아 로그인
     */
    @PostMapping("/signIn")
    @ApiOperation(value = "로그인", notes = "아이디 비밀번호를 입력후 로그인.")
    public ResponseEntity<BaseResponseBody> login(
            @RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq userLogin){

        try{
            User userLoginPostRes = userService.login(userLogin);
            if(userLoginPostRes != null && userLoginPostRes.getShop() != null)
                return ResponseEntity.status(201).body(BaseResponseBody.of("success", UserRes.of(userLoginPostRes)));

            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", "정보가 올바르지 않습니다."));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * OYT | 2022.04.27
     * @name idcheck
     * @api {get} /user/idcheck?userId=user_id
     * @des 아이디를 입력 받아 중복 체크
     */
    @GetMapping("/idcheck")
    @ApiOperation(value = "아이디 중복검사", notes = "아이디 중복 검사")
    public ResponseEntity<BaseResponseBody> idcheck(
            @RequestParam @ApiParam(value="아이디", required = true) String userId) {

        try{
            User userIdGetRes = userService.findUserByUserId(userId);
            if(userIdGetRes == null)
                return ResponseEntity.status(200).body(BaseResponseBody.of("success", true));

            return ResponseEntity.status(200).body(BaseResponseBody.of("success", false));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * OYT | 2022.05.04
     * @name findShopByShopNumber
     * @api {get} /user?shop_number=shop_number
     * @des 사업자번호를 입력 받아 유저 정보 반환
     */
    @GetMapping()
    @ApiOperation(value = "가게정보 가져오기", notes = "사업자 번호를 통해 해당 유저의 정보를 불러온다.")
    public ResponseEntity<BaseResponseBody> findShopByShopNumber(
            @RequestParam @ApiParam(value="사업자번호", required = true) String shop_number) {

        try{
            Shop shopInfoGetRes = userService.findShopByShopNumber(shop_number);
            return ResponseEntity.status(200).body(BaseResponseBody.of("success", ShopRes.of(shopInfoGetRes)));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }

    }

    /**
     * OYT | 2022.04.28
     * @name passwordCheck
     * @api {get} /user/passwordCheck
     * @des 유저 ID, PW를 입력 받아 해당 유저가 맞는지 확인
     */
    @PostMapping("/passwordCheck")
    @ApiOperation(value = "비밀번호 확인", notes = "내정보 확인을 위한 비밀번호 확인")
    public ResponseEntity<BaseResponseBody> passwordCheck(
            @RequestBody @ApiParam(value = "유저 정보", required = true) UserLoginPostReq userInfo){
        try{
            User userInfoPostRes = userService.passwordCheck(userInfo);
            if(userInfoPostRes != null){
                return ResponseEntity.status(201).body(BaseResponseBody.of("success"));
            }else {
                return ResponseEntity.status(201).body(BaseResponseBody.of("fail","비밀번호를 확인하세요"));
            }
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * OYT | 2022.04.28
     * @name deleteUser
     * @api {patch} /user/delete
     * @des 회원 ID를 입력받아 회원 탈퇴 여부 변경
     */
    @PatchMapping("/delete")
    @ApiOperation(value = "회원 탈퇴", notes = "회원 ID를 입력 받아 탈퇴 여부를 수정한다. ")
    public ResponseEntity<BaseResponseBody> deleteUser(
            @RequestBody @ApiParam(value="회원 ID", required = true) String userId) {

        try{
            userService.deleteUser(userId);
            return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }

    }

    /**
     * OYT | 2022.04.28
     * @name sendPhoneRandomNum
     * @api {get} /user/phoneRequest?phone=phoneNumber
     * @des 유저 핸드폰 번호를 입력 받아 인증 문자 발송
     */
    @GetMapping("/phoneRequest")
    @ApiOperation(value = "인증문자 발송", notes = "인증 요청한 핸드폰 번호로 인증 문자를 발송한다.")
    public ResponseEntity<BaseResponseBody> sendPhoneRandomNum(
            @RequestParam @ApiParam(value="핸드폰번호", required = true) String phoneNumber) {

        try{
            User userByPhoneChk = userService.findUserByPhone(phoneNumber);
            if(userByPhoneChk != null){
                return ResponseEntity.status(200).body(BaseResponseBody.of("fail", "이미 인증된 번호 입니다."));
            }else{
                int randomNum = messageService.sendMessage(phoneNumber);
                return ResponseEntity.status(200).body(BaseResponseBody.of("success"));
            }
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * OYT | 2022.04.28
     * @name findTop1ByPhoneNumberOrderByIdDesc
     * @api {get} /user/phoneCheck?phoneNumber=phone&certifiedNum=auth_num
     * @des 전송 받은 인증 번호 체크
     */
    @GetMapping("/phoneCheck")
    @ApiOperation(value = "인증번호 확인", notes = "전송 받은 인증 번호를 체크한다.")
    public ResponseEntity<BaseResponseBody> findTop1ByPhoneNumberOrderByIdDesc(
            @RequestParam @ApiParam(value="핸드폰번호", required = true) String phoneNumber, @ApiParam(value="인증번호", required = true) int certifiedNum) {

        try{
            boolean certified= userService.findTop1ByPhoneNumberOrderByIdDesc(phoneNumber, certifiedNum);
            if(certified){
                return ResponseEntity.status(200).body(BaseResponseBody.of("success", true));
            }else{
                return ResponseEntity.status(200).body(BaseResponseBody.of("success", false));
            }
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }


    /**
     * OYT | 2022.04.28
     * @name shopInfoSave
     * @api {patch} /user
     * @des 회원 ID를 입력받아 회원 탈퇴 여부 변경
     */
    @PatchMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "가게 정보 수정", notes = "가게 정보를 입력 받아 수정한다. ")
    public ResponseEntity<BaseResponseBody> updateShopInfoSave(
            @ModelAttribute FormDataReq formData ) {
        try{
            Shop shop = userService.findShopByShopNumber(formData.getShopInfoReq().getShop_number());
            if (formData.getFile() != null) {
                if(formData.getShopInfoReq() != null && formData.getShopInfoReq().getImage_url() != null)
                    awsS3Service.deleteImage(shop.getImageUrl());
                formData.getShopInfoReq().setImage_url(awsS3Service.uploadImage(formData.getFile()));
            }
            shop = userService.updateShopInfoSave(formData.getShopInfoReq());
            return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }

    }


}
