package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.db.entity.Item;
import com.jeans.bloom.db.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * OYT | 2022.04.28
 * @name ItemServiceImpl
 * @des 아이템 조회 API 사용을 위한 Service
 */
@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepository itemRepository;
    @Override
    public Item findItemByItemId(int itemId) throws Exception {
        return itemRepository.findItemByItemId(itemId);
    }
}
