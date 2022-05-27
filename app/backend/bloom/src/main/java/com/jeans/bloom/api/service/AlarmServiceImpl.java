package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.AlarmRes;
import com.jeans.bloom.db.entity.Alarm;
import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.entity.type.StatusType;
import com.jeans.bloom.db.repository.AlarmRepository;
import com.jeans.bloom.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * LJA | 2022.05.04
 * @name AlarmServiceImpl
 * @des 알람 API 사용을 위한 Service
 */
@Service
public class AlarmServiceImpl implements AlarmService{
    @Autowired
    private AlarmRepository alarmRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * LJA | 2022.05.04
     * @name findAlarmsByUser_UserId
     * @des 회원 아이디를 입력받아 회원의 알람 리스트를 리턴해주는 메소드
     */
    @Override
    public List<AlarmRes> findAlarmsByUser_UserId(String userId) throws Exception {
        List<Alarm> alarms = alarmRepository.findAlarmsByUser_UserIdOrderByCreatedAtDesc(userId).orElse(null);
        return alarms.stream().map(alarm->AlarmRes.of(alarm)).collect(Collectors.toList());
    }

    /**
     * LJA | 2022.05.04
     * @name readAllAlarm
     * @des 회원 아이디를 입력받아 회원의 알람 리스트를 모두 읽음으로 체크해주는 메소드
     */
    @Override
    public void readAllAlarm(String userId) throws Exception {
        List<Alarm> alarms = alarmRepository.findAlarmsByUser_UserIdAndIsCheck(userId, StatusType.N).orElse(null);
        if(alarms != null) {
            alarms.forEach(alarm -> {
                alarm.setIsCheck(StatusType.Y);
            });
            alarmRepository.saveAll(alarms);
        }
    }


    /**
     * HHS | 2022.05.13
     * @name tokenUpdate
     * @des 회원 아이디와 폰 토큰 값을 받아 해당 유저의 폰 토큰값을 갱신해주는 메소드
     */
    @Override
    public void tokenUpdate(String user_id, String phone_token) throws Exception {
        User user = userRepository.findUserByUserId(user_id);
        //회원이 맞으면 변경
        if(user!=null){
            user.setPhoneToken(phone_token);
            userRepository.save(user);
        }
    }


}
