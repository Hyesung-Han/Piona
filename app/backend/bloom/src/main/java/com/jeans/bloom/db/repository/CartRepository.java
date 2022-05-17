package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * LJA | 2022.04.27
 * @name CartRepository
 * @des Cart 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    /**
     * LJA | 2022.04.27
     * @name findCartsByUser_UserId
     * @des 회원 아이디를 입력받아 회원의 장바구니 리스트를 리턴해주는 메소드
     */
    Optional<List<Cart>> findCartsByUser_UserId(String userId) throws Exception;


    List<Cart> findByUser_UserId(String user_id);
}
