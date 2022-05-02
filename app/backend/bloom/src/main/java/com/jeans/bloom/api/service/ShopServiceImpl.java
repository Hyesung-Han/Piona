package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.api.response.ShopRes;
import com.jeans.bloom.db.entity.Item;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.Shop;
import com.jeans.bloom.db.repository.ItemRepository;
import com.jeans.bloom.db.repository.ReviewRepository;
import com.jeans.bloom.db.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * HHS | 2022.04.27
 * @name ShopServiceImpl
 * @des 가게 관련 로직처리를 위한 서비스 구현 정의
 */
@Service
public class ShopServiceImpl implements ShopService{

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ReviewRepository reviewRepository;
    /**
     * HHS | 2022.05.02
     * @name findShopByShopNumber
     * @des shop number로 해당 가게의 상세 정보 가져오기
     */
    @Override
    public ShopRes findShopByShopNumber(String shopNumber) throws Exception{

        Optional<Shop> optionalShop = shopRepository.findShopByShopNumber(shopNumber);

        List<Review> review = reviewRepository.findReviewByReservation_Shop_ShopNumber(shopNumber);
        int count = review.size();
        double avg = review.stream().mapToInt(Review::getScore).average().orElse(0.0);
        return ShopRes.of(optionalShop.map(ShopRes::of).orElse(null),avg, count);
    }

    /**
     * HHS | 2022.04.28
     * @name findItemsByShop_ShopNumber
     * @des shop number로 해당 가게의 상품 목록 가져오기
     */
    @Override
    public List<ItemRes> findItemsByShop_ShopNumber(String shopNumber) throws Exception {
        Optional<List<Item>> optionalItems = itemRepository.findItemsByShop_ShopNumber(shopNumber);
        return optionalItems.map(items -> items.stream().map(item -> ItemRes.of(item)).collect(Collectors.toList())).orElse(null);
    }

}
