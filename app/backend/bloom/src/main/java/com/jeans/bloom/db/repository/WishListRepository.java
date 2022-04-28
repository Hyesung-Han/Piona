package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * HHS | 2022.04.28
 * @name WishListRepository
 * @Class 설명 : WishList 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface WishListRepository extends JpaRepository<WishList, String> {



}
