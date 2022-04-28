package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * HHS | 2022.04.28
 * @name ItemRepository
 * @Class 설명 : Item 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, String>{

    Optional<List<Item>> findItemsByShop_ShopNumber(String shopNumber) throws Exception;

}


