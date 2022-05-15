package com.jeans.bloom.api.service;


import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.db.entity.Item;

public interface ItemService {
    Item findItemByItemId(int itemId) throws Exception;
}
