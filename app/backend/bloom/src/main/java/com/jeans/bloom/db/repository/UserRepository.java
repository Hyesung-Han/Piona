package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * OYT | 2022.04.27
 * @name UserRepository
 * @des user 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findUserByUserId(String userId) throws Exception;

    User findUserByNickName(String nickName) throws Exception;

    User findUserByPhone(String phone) throws Exception;


    /**
     * HHS | 2022.05.13
     * @name getUserPhoneToken
     * @des 현재 날짜와 예약날짜가 같은 유저의 폰 토큰 반환
     */
    @Query(value =
            "SELECT " +
                    " r.user_id " +
                    " FROM reservation_t as r " +
                    " WHERE (r.status = \"U\" or r.status = \"R\") and r.reservation_id = " +
                    " any (SELECT rd.reservation_id " +
                    " FROM reservation_detail_t as rd " +
                    " WHERE DATE_FORMAT(rd.reservation_date, '%Y-%m-%d') = DATE_FORMAT(now(), '%Y-%m-%d') "+
                    " GROUP BY rd.reservation_id)"
            , nativeQuery = true
    )
    List<String> getUserToken() throws Exception;

}
