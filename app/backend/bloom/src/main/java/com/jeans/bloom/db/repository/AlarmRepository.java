package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Alarm;
import com.jeans.bloom.db.entity.type.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * LJA | 2022.05.04
 * @name AlarmRepository
 * @des Alarm 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

    /**
     * LJA | 2022.05.04
     * @name findAlarmsByUser_UserId
     * @des 회원 아이디를 입력받아 회원의 알람 리스트를 리턴해주는 메소드
     */
    Optional<List<Alarm>> findAlarmsByUser_UserId(String userId) throws Exception;

    /**
     * LJA | 2022.05.04
     * @name findAlarmsByUser_UserIdAndIsCheck
     * @des 회원 아이디를 입력받아 회원의 안읽은 알람 리스트를 리턴해주는 메소드
     */
    Optional<List<Alarm>> findAlarmsByUser_UserIdAndIsCheck(String userId, StatusType statusType) throws Exception;
}
