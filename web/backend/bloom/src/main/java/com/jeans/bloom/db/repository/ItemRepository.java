package com.jeans.bloom.db.repository;

import com.jeans.bloom.db.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * HHS | 2022.05.05
 * @name ItemRepository
 * @des Item 관리를 위한 JpaRepository
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, String> {
    Item findItemByItemId(int itemId) throws Exception;
}
