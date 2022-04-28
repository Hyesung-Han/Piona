package com.jeans.bloom.api.service;

import com.jeans.bloom.api.request.WishListReq;
import com.jeans.bloom.db.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * HHS | 2022.04.28
 * @name WishListServiceImpl
 * @des 위시리스트 로직처리를 위한 서비스 구현 정의
 */
@Service
public class WishListServiceImpl implements WishListService{

    @Autowired
    private WishListRepository wishListRepository;

    /**
     * HHS | 2022.04.28
     * @name insertWishList
     * @des shop number와 user id로 위시리스트 추가하기
     */
    @Override
    public void insertWishList(WishListReq wishList) throws Exception {
        wishListRepository.save(wishList.toWishList());
    }


    /**
     * HHS | 2022.04.28
     * @name deleteWishList
     * @des wish id로 위시리스트 삭제하기
     */
    @Override
    public void deleteWishList(int wishId) throws Exception{
        wishListRepository.deleteById(wishId);
    }
}
