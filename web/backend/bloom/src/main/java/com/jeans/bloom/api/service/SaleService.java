package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.SaleRes;

import java.time.LocalDate;
import java.util.List;

public interface SaleService {
    List<SaleRes> getTotalSale(String shopNumber, LocalDate startDate, LocalDate endDate) throws Exception;
}
