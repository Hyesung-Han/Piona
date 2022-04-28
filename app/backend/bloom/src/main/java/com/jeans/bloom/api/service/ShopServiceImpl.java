package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ShopRes;
import com.jeans.bloom.db.entity.Shop;
import com.jeans.bloom.db.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * HHS | 2022.04.27
 * @name ShopServiceImpl
 * @des 가게 관련 로직처리를 위한 서비스 구현 정의
 */
@Service
public class ShopServiceImpl implements ShopService{

    @Autowired
    ShopRepository shopRepository;


    /**
     * HHS | 2022.04.27
     * @name findShopByShopNumber
     * @des shop number로 해당 가게의 상세 정보 가져오기
     */
    @Override
    public ShopRes findShopByShopNumber(String shopNumber) throws Exception{

        Optional<Shop> optionalShop = shopRepository.findShopByShopNumber(shopNumber);
        return optionalShop.map(ShopRes::of).orElse(null);
    }
}
