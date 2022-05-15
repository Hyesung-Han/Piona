package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.AlarmRes;

import java.util.List;

public interface AlarmService {

    List<AlarmRes> findAlarmsByUser_UserId(String userId) throws Exception;
    void readAllAlarm(String userId) throws Exception;
}
