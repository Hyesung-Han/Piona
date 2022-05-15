package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.ItemInfoReq;
import com.jeans.bloom.api.request.ItemWriteReq;
import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.db.entity.Item;
import com.jeans.bloom.db.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * HHS | 2022.05.06
 * @name ItemServiceImpl
 * @des 상품 API 사용을 위한 Service
 */
@Service
public class ItemServiceImpl implements ItemService{

    @Autowired
    private ItemRepository itemRepository;

    /**
     * HHS | 2022.05.06
     * @name writeItem
     * @api {post} /item
     * @des 상품 정보를 받아 상품 등록해주는 메소드
     */
    @Override
    public void writeItem(ItemWriteReq itemWriteReq) throws Exception{
        itemRepository.save(itemWriteReq.toItem());
    }

    /**
     * HHS | 2022.05.06
     *
     * @name findItemByItemId
     * @des 상품 아이디를 통해 상품 상세 정보를 가져오는 메서드
     */
    @Override
    public Item findItemByItemId(int itemId) throws Exception{
        return itemRepository.findItemByItemId(itemId);
    }

    /**
     * HHS | 2022.05.07
     * @name findItemsByShop_ShopNumber
     * @des 사업자 등록번호를 통해 해당 가게의 상품리스트를 불러오는 메서드
     */
    @Override
    public List<ItemRes> findItemsByShop_ShopNumber(String shopNumber) throws Exception {
        List<Item> items = itemRepository.findItemsByShop_ShopNumber(shopNumber).orElse(null);
        return items.stream().map(item -> ItemRes.of(item)).collect(Collectors.toList());
    }

    /**
     * HHS | 2022.05.07
     * @name deleteItem
     * @des 상품 번호를 통해 해당 상품을 삭제하는 메서드
     */
    @Override
    public Boolean deleteItem(int itemId) throws Exception {
        Item item = itemRepository.findItemByItemId(itemId);
        if(item != null){
            itemRepository.delete(item);
            return true;
        }else return false;
    }

    /**
     * HHS | 2022.05.07
     * @name updateItemInfo
     * @des 상품 정보를 받아 업데이트하는 메서드
     */
    @Override
    public Item updateItemInfo(ItemInfoReq itemInfoReq) throws Exception {
        Item item = itemRepository.findItemByItemId(itemInfoReq.getItem_id());

        item.setItemId(itemInfoReq.getItem_id());
        item.setName(itemInfoReq.getName());
        item.setPrice(itemInfoReq.getPrice());
        item.setTotalQuantity(itemInfoReq.getTotal_quantity());
        item.setDescription(itemInfoReq.getDescription());
        item.setImageUrl(itemInfoReq.getImage_url());

        return itemRepository.save(item);
    }


}
