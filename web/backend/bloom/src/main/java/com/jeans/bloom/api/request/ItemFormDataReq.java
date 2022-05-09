package com.jeans.bloom.api.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ItemFormDataReq {
    private MultipartFile file;
    private ItemInfoReq itemInfoReq;
}
