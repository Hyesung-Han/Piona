package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.api.response.SaleRes;
import com.jeans.bloom.db.entity.Reservation;
import com.jeans.bloom.db.entity.type.OrderStatus;
import com.jeans.bloom.db.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * LJA | 2022.05.08
 * @name SaleServiceImpl
 * @des 기업페이지에서 매출 관련 처리를 위한 서비스 구현 정의
 */
@Service
public class SaleServiceImpl implements SaleService {
    @Autowired
    private ReservationRepository reservationRepository;

    /**
     * LJA | 2022.05.08
     * @name getTotalSale
     * @des shop_number를 사용해 매출 현황을 가져오는 메소드
     */
    @Override
    public List<SaleRes> getTotalSale(String shopNumber) throws Exception {
        List<Object[]> objectList = reservationRepository.getTotalSale(shopNumber);
        List<SaleRes> saleResList = objectList.stream().map(
                objects -> new SaleRes((String) objects[0],
                        (Integer) objects[1],
                        ((BigDecimal) objects[2]).intValue(),
                        ((BigDecimal) objects[3]).intValue(),
                        (String) objects[4])).collect(Collectors.toList());
        return saleResList;
    }

}
