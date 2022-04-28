package com.jeans.bloom.api.service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class MessageServiceImpl implements MessageService {
    @Value("${cools.apiKey}")
    private String apiKey;
    @Value("${cools.apiSecret}")
    private String apiSecret;
    @Value("${cools.from-number}")
    private String fromNumber;

    @Override
    public int sendMessage(String toNumber) throws Exception{

        Message coolsms = new Message(apiKey, apiSecret);

        int randomNumber = (int)(Math.random() * (99999 - 10000 + 1)) + 10000;
        System.out.println("randomNumber : " + randomNumber);

        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", toNumber);
        params.put("from", fromNumber);
        params.put("type", "SMS");
        params.put("text", "[Bloom] 인증번호 "+randomNumber+" 를 입력하세요.");
        params.put("app_version", "Bloom app 1.0"); // application name and version

        JSONObject obj = (JSONObject) coolsms.send(params);
        System.out.println(obj.toString());
        return randomNumber;
    }
}
