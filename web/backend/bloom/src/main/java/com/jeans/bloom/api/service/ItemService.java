package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ItemWriteReq;
import com.jeans.bloom.api.response.ItemRes;

public interface ItemService {
    void writeItem(ItemWriteReq itemWriteReq) throws Exception;

    ItemRes findItemByItemId(int item_id) throws Exception;
}
