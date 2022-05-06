package com.jeans.bloom.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewCommentReq {

    int review_id;
    String content;

}
