package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ItemRes;
import com.jeans.bloom.api.response.ShopRes;
import com.jeans.bloom.db.entity.Item;
import com.jeans.bloom.db.entity.Review;
import com.jeans.bloom.db.entity.Shop;
import com.jeans.bloom.db.entity.WishList;
import com.jeans.bloom.db.repository.ItemRepository;
import com.jeans.bloom.db.repository.ReservationDetailRepository;
import com.jeans.bloom.db.repository.ReviewRepository;
import com.jeans.bloom.db.repository.ShopRepository;
import com.jeans.bloom.db.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.time.LocalDate;
import java.util.Date;
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

    @Autowired
    private WishListRepository wishListRepository;


    @Autowired
    private ReservationDetailRepository reservationDetailRepository;

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


    /**
     * HHS | 2022.05.06
     * @name findShopListByShopLngBetweenAndShopLatBetweenAndUser_userId
     * @des 위,경도 반경에 해당하는 해당 가게의 상품 목록 가져오기
     */
    @Override
    public List<ShopRes> findShopListByShopLngBetweenAndShopLatBetweenAndUser_userId(BigDecimal lng_min, BigDecimal lng_max, BigDecimal lat_min, BigDecimal lat_max, String user_id) throws Exception{
        List<Shop> optionalShopList = shopRepository.findShopListByShopLngBetweenAndShopLatBetween(lng_min, lng_max, lat_min, lat_max).orElse(null);//shop찾음
        ShopRes shop = null;
        List<ShopRes> shopResList = new ArrayList<>();

        for(int i = 0; i < optionalShopList.size(); i++){
            String shopNum = optionalShopList.get(i).getShopNumber();
            ShopRes shopRes = findShopByShopNumber(shopNum);
            WishList wishList = wishListRepository.findWishListByUser_UserIdAndShop_ShopNumber(user_id, shopNum);
            if(wishList != null) {
                int wish_id = wishList.getWishId();
                shop = ShopRes.of(shopRes, wish_id);
            }else {
                shop = ShopRes.of(shopRes, 0);
            }
            shopResList.add(shop);
        }

        return shopResList;
    }

    /**
     * HHS | 2022.05.06
     * @name findShopByKeyword
     * @des 해시태그에 해당하는 해당 가게의 상품 목록 가져오기
     */
    @Override
    public List<ShopRes> findShopByKeyword(String user_id, String keyword) throws Exception{
        List<ShopRes> shopResList = new ArrayList<>();
        List<Shop> shops = shopRepository.findAll();
        ShopRes shop = null;
        for(int i = 0; i < shops.size(); i++) {
            String shopNumber = shops.get(i).getShopNumber();

            List<Review> review = reviewRepository.findReviewByReservation_Shop_ShopNumber(shopNumber);
            int count = review.size();
            int kwCount = 0;
            for(int j = 0; j < count; j++){
                if(keyword.equals("kw_reasonable")) {
                    if (review.get(j).getKwReasonable().equals("Y")) kwCount++;
                }else if (keyword.equals("kw_mood")) {
                    if(review.get(j).getKwMood().equals("Y")) kwCount++;
                }else if(keyword.equals("kw_clean")){
                   if(review.get(j).getKwClean().equals("Y")) kwCount++;
                }else if(keyword.equals("kw_adorable")){
                    if(review.get(j).getKwAdorable().equals("Y")) kwCount++;
                }else if(keyword.equals("kw_various")){
                    if(review.get(j).getKwVarious().equals("Y")) kwCount++;
                }else if(keyword.equals("kw_kind")){
                    if(review.get(j).getKwKind().equals("Y")) kwCount++;
                }
            }
            if(count > 0 && kwCount > 0  && kwCount >= count*0.5){
                shop = findShopByShopNumber(shopNumber);
                WishList wishList = wishListRepository.findWishListByUser_UserIdAndShop_ShopNumber(user_id, shopNumber);
                if(wishList != null) {
                    int wish_id = wishList.getWishId();
                    shop = ShopRes.of(shop, wish_id);
                }else {
                    shop = ShopRes.of(shop, 0);
                }
                shopResList.add(shop);
            }
        }
        return shopResList;
    }

    /**
     * LJA | 2022.05.04
     * @name getUnableDate
     * @des item_id와 quantity를 입력받아 해당 아이템을 예약할 수 없는 날짜를 리턴
     */
    @Override
    public List<Date> getUnableDate(int itemId, int quantity) throws Exception {
        return reservationDetailRepository.getUnableDate(itemId, LocalDate.now(), quantity);
    }

}
