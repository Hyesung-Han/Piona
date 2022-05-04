package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.response.AlarmRes;
import com.jeans.bloom.api.service.AlarmService;
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

    /**
     * LJA | 2022.05.04
     * @name findAlarmsByUser_UserId
     * @api {get} /alarm?user_id=user_id
     * @des 회원 아이디를 입력받아 회원의 알람 리스트를 리턴해주는 메소드
     */
    @GetMapping
    @ApiOperation(value = "알람 목록 조회", notes = "아이디를 통해 회원의 알람람리스트를 조회한다")
    public ResponseEntity<BaseResponseBody> findAlarmsByUser_UserId(
            @RequestParam @ApiParam(value="회원아이디", required = true) String userId) {
        try{
            List<AlarmRes> alarmList = alarmService.findAlarmsByUser_UserId(userId);
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
            @RequestParam @ApiParam(value="회원아이디", required = true) String userId) {
        try{
            alarmService.readAllAlarm(userId);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }
}
