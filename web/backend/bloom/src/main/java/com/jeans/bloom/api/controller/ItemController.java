package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.ItemWriteReq;
import com.jeans.bloom.api.service.ItemService;
import com.jeans.bloom.common.auth.AwsS3Service;
import com.jeans.bloom.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * HHS | 2022.05.06
 * @name ItemController
 * @des Item API 사용을 위한 Controller
 */

@Api(value = "상품 API", tags = {"Item"})
@RequestMapping("/item")
@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private AwsS3Service awsS3Service;


    /**
     * HHS | 2022.05.06
     * @name writeItem
     * @api {post} /item
     * @des 상품작성 정보를 받아 상품 저장하는 API
     */

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "상품 등록하기", notes = "상품 작성 정보를 받아 상품을 저장한다")
    public ResponseEntity<BaseResponseBody> writeItem(
            @ModelAttribute ItemWriteReq itemWriteReq, @RequestPart(value="file", required = false) List<MultipartFile> multipartFiles) {
        try{
            if(multipartFiles != null) {
                List<String> fileUrls = awsS3Service.uploadImage(multipartFiles);
                StringBuilder sb = new StringBuilder();
                for (String fileUrl : fileUrls) {
                    sb.append(fileUrl+",");
                }
                sb.deleteCharAt(sb.lastIndexOf(","));
                itemWriteReq.setImageUrl(sb.toString());
            }
            itemService.writeItem(itemWriteReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success"));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }

}
