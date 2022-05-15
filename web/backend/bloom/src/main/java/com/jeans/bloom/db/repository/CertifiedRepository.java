package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.CertificationNum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * OYT | 2022.04.28
 * @name CertifiedRepository
 * @des 인증번호 저장 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface CertifiedRepository extends JpaRepository<CertificationNum, Integer> {

    CertificationNum findTop1ByPhoneNumberOrderByIdDesc(String phoneNumber);
}
