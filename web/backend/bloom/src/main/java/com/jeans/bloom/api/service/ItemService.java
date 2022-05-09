package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ItemInfoReq;
import com.jeans.bloom.api.request.ItemWriteReq;
import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.db.entity.Item;

import java.util.List;

public interface ItemService {
    void writeItem(ItemWriteReq itemWriteReq) throws Exception;

    Item findItemByItemId(int item_id) throws Exception;

    List<ItemRes> findItemsByShop_ShopNumber(String shop_number) throws Exception;

    Boolean deleteItem(int item_id)throws Exception;

    Item updateItemInfo(ItemInfoReq itemInfoReq) throws Exception;
}
