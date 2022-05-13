package com.jeans.bloom.api.service;

import java.io.IOException;

public interface FCMService {

    void sendMessageTo(String targetToken, String title, String body) throws IOException;

    void sendMessage(String title, String body) throws Exception;

    void insertAlarm(String user_id, String content) throws Exception;
}
