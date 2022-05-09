package com.jeans.bloom.api.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jeans.bloom.db.entity.Reservation;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
@Builder
@ApiModel("SaleRes")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaleRes {
    String reservation_date;
    int item_id;
    int quantity;
    int price;
    String item_name;


    public SaleRes(String reservation_date, int item_id, int quantity, int price, String item_name) {
        this.reservation_date = reservation_date;
        this.item_id = item_id;
        this.quantity = quantity;
        this.price = price;
        this.item_name = item_name;
    }
}
