package com.jeans.bloom.api.service;

import com.jeans.bloom.api.response.ShopRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import java.io.*;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;
/**
 * HHS | 2022.05.06
 * @name SearchShopServiceImpl
 * @des 검색 관련 로직처리를 위한 서비스 구현 정의
 */
@Service
public class SearchShopServiceImpl implements SearchShopService {

    @Autowired
    private ShopService shopService;

    /**
     * HHS | 2022.05.06
     * @name search
     * @des 검색어로 네이버 API 검색을 통해 주소값 얻어오기
     */
    @Override
    public List<ShopRes> search(String user_id, String word, double user_lng, double user_lat) throws Exception {
        List<ShopRes> shops = new ArrayList<>();

        if(word == null) {
            shops = addrToNum(null, user_id, user_lng, user_lat);

        }else {
            String text = null;

            try {
                text = URLEncoder.encode(word, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException("검색어 인코딩 실패", e);
            }

            String apiURL = "https://openapi.naver.com/v1/search/local?query=" + text + "&display=1"; // json 결과

            Map<String, String> requestHeaders = new HashMap<>();
            requestHeaders.put("X-Naver-Client-Id", "jc2OcvvYJ7a3__Mt7845");
            requestHeaders.put("X-Naver-Client-Secret", "rVCza6mVSn");
            String responseBody = get(apiURL, requestHeaders);
            String ad = "address";
            int ad_num = responseBody.indexOf(ad) + 11;

            if (ad_num < 11) {
                shops = addrToNum(word, user_id, user_lng, user_lat);
            } else {
                String addr = responseBody.substring(ad_num, (responseBody.substring(ad_num).indexOf('"') + ad_num));
                shops = addrToNum(addr, user_id, user_lng, user_lat);
            }
        }
        return shops;
    }


    private static String get(String apiUrl, Map<String, String> requestHeaders) {
        HttpURLConnection connection = connect(apiUrl);
        try {
            connection.setRequestMethod("GET");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                connection.setRequestProperty(header.getKey(), header.getValue());
            }
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                return readBody(connection.getInputStream());
            } else {
                return readBody(connection.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패");
        } finally {
            connection.disconnect();
        }

    }

    private static HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결 실패 : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);
        try (BufferedReader br = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = br.readLine()) != null) {
                responseBody.append(line);
            }
            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }

    /**
     * HHS | 2022.05.06
     * @name addrToNum
     * @des 검색어로 네이버 API 검색을 통해 위도, 경도값 얻고, 반경 계산하여 shopService의 method불러오기
     */
    public List<ShopRes> addrToNum(String ad, String user_id, double user_lng, double user_lat) throws Exception{
        double lng_lat[] = new double[2];

        if(ad != null) {

            String addr = null;
            try {
                addr = URLEncoder.encode(ad, "utf-8");
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException("검색어 인코딩 실패", e);
            }
            String api = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + addr;
            StringBuffer sb = new StringBuffer();
            try {
                URL url = new URL(api);
                HttpsURLConnection http = (HttpsURLConnection) url.openConnection();
                http.setRequestProperty("Content-Type", "application/json");
                http.setRequestProperty("X-NCP-APIGW-API-KEY-ID", "osk4djr2wf");
                http.setRequestProperty("X-NCP-APIGW-API-KEY", "0DIe4BituLYIEU2TCr8KmArHN3DbUMNKmJ3t6T5m");
                http.setRequestMethod("GET");
                http.connect();

                InputStreamReader in = new InputStreamReader(http.getInputStream(), "utf-8");
                BufferedReader br = new BufferedReader(in);

                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line).append("\n");
                }

                String addrFull = sb.toString();
                String addressElements = "addressElements";

                int ele_num = addrFull.indexOf(addressElements);
                String address = addrFull.substring(ele_num);
                String lng = "x";
                String lat = "y";
                int lng_num = address.indexOf(lng) + 4;
                String addrX = address.substring(lng_num);
                int lat_num = addrX.indexOf(lat) + 4;
                lng_lat[0] = Double.parseDouble(address.substring(lng_num, (address.substring(lng_num).indexOf('"') + lng_num)));
                lng_lat[1] = Double.parseDouble(addrX.substring(lat_num, (addrX.substring(lat_num).indexOf('"') + lat_num)));
                br.close();
                in.close();
                http.disconnect();
                BigDecimal lng_min = BigDecimal.valueOf(lng_lat[0] - (5 / 88.74));
                BigDecimal lng_max = BigDecimal.valueOf(lng_lat[0] + (5 / 88.74));
                BigDecimal lat_min = BigDecimal.valueOf(lng_lat[1] - (5 / 109.958489129849955));
                BigDecimal lat_max = BigDecimal.valueOf(lng_lat[1] + (5 / 109.958489129849955));
                return shopService.findShopListByShopLngBetweenAndShopLatBetweenAndUser_userId(lng_min, lng_max, lat_min, lat_max, user_id);


            } catch (IOException e) {
                throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
            }
        }else{
            BigDecimal lng_min = BigDecimal.valueOf(user_lng - (5 / 88.74));
            BigDecimal lng_max = BigDecimal.valueOf(user_lng + (5 / 88.74));
            BigDecimal lat_min = BigDecimal.valueOf(user_lat - (5 / 109.958489129849955));
            BigDecimal lat_max = BigDecimal.valueOf(user_lat + (5 / 109.958489129849955));

            return shopService.findShopListByShopLngBetweenAndShopLatBetweenAndUser_userId(lng_min, lng_max, lat_min, lat_max, user_id);
        }

    }

}