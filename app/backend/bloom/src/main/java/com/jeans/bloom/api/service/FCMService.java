package com.jeans.bloom.api.service;

import java.io.IOException;

public interface FCMService {

    void sendMessageTo(String targetToken, String title, String body) throws IOException;
}
