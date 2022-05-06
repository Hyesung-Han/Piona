package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ItemWriteReq;

public interface ItemService {
    void writeItem(ItemWriteReq itemWriteReq) throws Exception;
}
