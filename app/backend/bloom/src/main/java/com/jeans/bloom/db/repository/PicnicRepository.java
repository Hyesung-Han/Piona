package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * LJA | 2022.04.28
 * @name PicnicRepository
 * @des 피크닉관련 API 실행을 위한 JpaRepository
 */
@Repository
public interface PicnicRepository extends JpaRepository<Reservation, Integer> {

    /**
     * LJA | 2022.04.28
     * @name findReservationsByUser_UserId
     * @des 회원 아이디를 입력받아 회원의 전체 예약리스트을 리턴해주는 메소드
     */
    Optional<List<Reservation>> findReservationsByUser_UserId(String userId) throws Exception;
}
