package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.SQLDataException;

/**
 * OYT | 2022.04.27
 * @name UserRepository
 * @des user 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findUserByUserId(String userId) throws Exception;

    User findUserByPhone(String phone) throws Exception;
}
