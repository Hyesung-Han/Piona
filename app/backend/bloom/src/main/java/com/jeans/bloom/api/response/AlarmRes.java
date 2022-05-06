package com.jeans.bloom.api.response;

import com.jeans.bloom.db.entity.Alarm;
import com.jeans.bloom.db.entity.type.StatusType;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * LJA | 2022.05.04
 * @name AlarmRes
 * @des 회원 알람을 리턴하기 위한 DTO
 */
@Getter @Setter
@Builder
@ApiModel("Alarm Response")
public class AlarmRes {
    int alarm_id;
    String user_id;
    String content;
    LocalDateTime created_at;
    StatusType is_check;

    public static AlarmRes of(Alarm alarm) {
        return AlarmRes.builder()
                .alarm_id(alarm.getAlarmId())
                .user_id(alarm.getUser().getUserId())
                .content(alarm.getContent())
                .created_at(alarm.getCreatedAt())
                .is_check(alarm.getIsCheck())
                .build();
    }
}
