package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.request.ItemFormDataReq;
import com.jeans.bloom.api.request.ItemWriteReq;
import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.api.response.ReviewRes;
import com.jeans.bloom.api.service.ItemService;
import com.jeans.bloom.common.auth.AwsS3Service;
import com.jeans.bloom.common.response.BaseResponseBody;
import com.jeans.bloom.db.entity.Item;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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

    /**
     * HHS | 2022.05.06
     * @name findItemByItemId
     * @api {get} /item/item_id
     * @des 상품 아이디를 통한 리뷰 상세정보 받기
     */
    @GetMapping("/{item_id}")
    @ApiOperation(value = "상품 상세 정보", notes = "상품 아이디를 통해 상품의 상세정보 받아오기")
    public ResponseEntity<BaseResponseBody> findItemByItemId(
            @PathVariable @ApiParam(value = "상품 아이디", required = true) int item_id){
        try{
            ItemRes itemDetail = ItemRes.of(itemService.findItemByItemId(item_id));
            return ResponseEntity.status(200).body(BaseResponseBody.of("success", itemDetail));
        }catch(Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }

    /**
     * HHS | 2022.05.07
     * @name findItemsByShop_ShopNumber
     * @api {get} /item?shop_number=shop_number
     * @des 사업자 등록번호를 통한 상품 리스트 받기
     */
    @GetMapping
    @ApiOperation(value = "상품 리스트", notes = "사업자 번호를 통해 해당 가게의 상품 리스트 받아오기")
    public ResponseEntity<BaseResponseBody> findItemsByShop_ShopNumber(
            @RequestParam @ApiParam(value = "사업자 등록 번호", required = true) String shop_number){
        try{
            List<ItemRes> itemResList = itemService.findItemsByShop_ShopNumber(shop_number);
            return ResponseEntity.status(200).body(BaseResponseBody.of("success", itemResList));
        }catch(Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }
    /**
     * HHS | 2022.05.07
     * @name deleteItem
     * @api {delete} /item?item_id=item_id
     * @des 상품 번호를 통한 상품 삭제하기
     */
    @DeleteMapping
    @ApiOperation(value = "상품 삭제", notes = "상품 번호를 통해 해당 상품을 삭제한다")
    public ResponseEntity<BaseResponseBody> deleteItem(
            @RequestParam @ApiParam(value = "상품 번호", required = true) int item_id){
        try{
            Boolean result = itemService.deleteItem(item_id);
            if(result){
                return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
            }
            return ResponseEntity.status(201).body(BaseResponseBody.of( "fail", "상품 삭제를 실패했습니다"));

        }catch(Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }
    }


    /**
     * HHS | 2022.05.07
     * @name updateItemInfo
     * @api {patch} /item
     * @des 상품 정보를 입력 받아 수정한다
     */
    @PatchMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "상품 정보 수정", notes = "상품 정보를 입력 받아 수정한다. ")
    public ResponseEntity<BaseResponseBody> updateItemInfo(
            @ModelAttribute ItemFormDataReq formData ) {
        try{
            Item item = itemService.findItemByItemId(formData.getItemInfoReq().getItem_id());
            if (formData.getFile() != null) {
                if(formData.getItemInfoReq() != null && formData.getItemInfoReq().getImage_url() != null)
                    awsS3Service.deleteImage(item.getImageUrl());
                formData.getItemInfoReq().setImage_url(awsS3Service.uploadImage(formData.getFile()));
            }
            item = itemService.updateItemInfo(formData.getItemInfoReq());
            return ResponseEntity.status(201).body(BaseResponseBody.of( "success"));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of("fail", e));
        }

    }
}
