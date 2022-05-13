package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.response.AlarmRes;
import com.jeans.bloom.api.service.AlarmService;
import com.jeans.bloom.api.service.FCMService;
import com.jeans.bloom.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * LJA | 2022.05.04
 * @name AlarmController
 * @des 알람 API 사용을 위한 Controller
 */
@RestController
@RequestMapping("/alarm")
@Api(value = "알람 API", tags = {"Alarm"})
public class AlarmController {

    @Autowired
    private AlarmService alarmService;

    @Autowired
    private FCMService firebaseCloudMessageService;

    /**
     * LJA | 2022.05.04
     * @name findAlarmsByUser_UserId
     * @api {get} /alarm?user_id=user_id
     * @des 회원 아이디를 입력받아 회원의 알람 리스트를 리턴해주는 메소드
     */
    @GetMapping
    @ApiOperation(value = "알람 목록 조회", notes = "아이디를 통해 회원의 알람람리스트를 조회한다")
    public ResponseEntity<BaseResponseBody> findAlarmsByUser_UserId(
            @RequestParam @ApiParam(value="회원아이디", required = true) String user_id) {
        try{
            List<AlarmRes> alarmList = alarmService.findAlarmsByUser_UserId(user_id);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success", alarmList));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }

    /**
     * LJA | 2022.05.04
     * @name readAllAlarm
     * @api {patch} /alarm?user_id=user_id
     * @des 회원 아이디를 입력받아 회원의 알람 리스트를 모두 읽음으로 체크해주는 메소드
     */
    @PatchMapping
    @ApiOperation(value = "알람 모두 읽기", notes = "아이디를 통해 회원의 알람람리스트를 모두 읽음으로 체크한다")
    public ResponseEntity<BaseResponseBody> readAllAlarm(
            @RequestParam @ApiParam(value="회원아이디", required = true) String user_id) {
        try{
            alarmService.readAllAlarm(user_id);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }

    /**
     * HHS | 2022.05.13
     * @name sendMessageTo
     * @api {post} /alarm/push?target_token=target_token&title=title&body=body
     * @des 토큰과 메시지 내용을 받아 해당 기기로 알림을 보내주는 메소드
     */
    @PostMapping("/push")
    @ApiOperation(value = "타겟 토큰과 메시지 타이틀과 바디", notes = "토큰과 메시지 내용을 받아 해당 기기로 알람을 보낸다.")
    public ResponseEntity<BaseResponseBody> sendMessageTo(
            @RequestParam @ApiParam(value = "target_token" , required = true) String target_token,
            @RequestParam @ApiParam(value = "title", required = true) String title,
            @RequestParam @ApiParam(value = "body",required = true) String body) {
        try {
            firebaseCloudMessageService.sendMessageTo(target_token ,title, body);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch(Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail"));
        }
    }


    /**
     * HHS | 2022.05.13
     * @name tokenUpdate
     * @api {patch} /alarm/push?user_id=user_id&target_token=target_token
     * @des 유저 아이디와 폰 토큰 값을 받아 해당 유저의 폰 토큰값을 갱신해주는 메소드
     */
    @PatchMapping("/push")
    @ApiOperation(value = "유저 아이디와 폰 토큰", notes = "로그인 시 해당 유저의 토큰을 업데이트한다.")
    public ResponseEntity<BaseResponseBody> tokenUpdate(
            @RequestParam @ApiParam(value="회원아이디", required = true) String user_id,
            @RequestParam @ApiParam(value="토큰", required = true) String phone_token) {
        try {
            alarmService.tokenUpdate(user_id, phone_token);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch(Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }


}
