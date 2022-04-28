package com.jeans.bloom.api.service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * OYT | 2022.04.28
 * @name MessageServiceImpl
 * @des 휴대폰 인증 관련 로직처리를 위한 서비스 구현 정의
 */
@Service
public class MessageServiceImpl implements MessageService {
    @Value("${cools.apiKey}")
    private String apiKey;
    @Value("${cools.apiSecret}")
    private String apiSecret;
    @Value("${cools.from-number}")
    private String fromNumber;

    @Autowired
    private UserService userService;

    /**
     * ㅒㅛㅆ | 2022.04.28
     * @name sendMessage
     * @des 핸드폰 번호로 해당 인증문자 발송 및 DB에 인증 번호 저장
     */
    @Override
    public int sendMessage(String toNumber) throws Exception{

        Message coolsms = new Message(apiKey, apiSecret);

        int randomNumber = (int)(Math.random() * (99999 - 10000 + 1)) + 10000;

        userService.saveCertification(toNumber, randomNumber);

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
