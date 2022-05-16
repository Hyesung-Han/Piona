package com.jeans.bloom.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartListReq {
    List<Integer> cart_list;

    public CartListReq() {
    }
}
