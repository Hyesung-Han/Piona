package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * HHS | 2022.04.27
 * @name ShopRepository
 * @Class 설명 : Shop 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ShopRepository extends JpaRepository<Shop, String> {

    Optional<Shop> findShopByShopNumber(String shopNumber) throws Exception;

    Optional<List<Shop>> findShopListByShopLngBetweenAndShopLatBetween(BigDecimal lng_min, BigDecimal lng_max, BigDecimal lat_min, BigDecimal lat_max);
}
