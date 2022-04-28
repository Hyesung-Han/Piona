package com.jeans.bloom.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * LJA | 2022.04.27
 * @name BaseResponseBody
 * @des response return 값에 대한 형식 정의
 */
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 데이터 전송 x
public class BaseResponseBody {
    String result;
    Object data;

    public static BaseResponseBody of(String result) {
        return BaseResponseBody.builder()
                .result(result)
                .build();
    }

    public static BaseResponseBody of(String result, Object data) {
        return BaseResponseBody.builder()
                .result(result)
                .data(data)
                .build();
    }

}
