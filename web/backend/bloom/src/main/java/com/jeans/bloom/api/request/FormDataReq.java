package com.jeans.bloom.api.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FormDataReq {
    private ShopInfoReq shopInfoReq;
    private  MultipartFile file;
}
