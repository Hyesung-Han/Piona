package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.entity.type.StatusType;
import com.jeans.bloom.db.entity.type.UserCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.SQLDataException;
import java.util.List;
import java.util.Optional;

/**
 * OYT | 2022.04.27
 * @name UserRepository
 * @des user 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findUserByUserId(String userId) throws Exception;

    User findUserByPhone(String phone) throws Exception;

    Optional<List<User>> findUserByUserCodeAndIsDelNot(UserCode userCode, StatusType statusCode) throws Exception;
}
