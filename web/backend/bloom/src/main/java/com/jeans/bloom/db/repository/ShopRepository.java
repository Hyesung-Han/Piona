package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * OYT | 2022.05.04
 * @name ShopRepository
 * @des shop 테이블 사용을 위한 JpaRepository
 */
@Repository
public interface ShopRepository extends JpaRepository<Shop, String> {
    Shop findShopByShopNumber(String shop_number) throws Exception;
}
