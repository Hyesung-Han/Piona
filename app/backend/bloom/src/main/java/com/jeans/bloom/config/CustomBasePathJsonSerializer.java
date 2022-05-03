package com.jeans.bloom.config;

import io.swagger.models.Swagger;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import springfox.documentation.spring.web.json.JacksonModuleRegistrar;
import springfox.documentation.spring.web.json.Json;
import springfox.documentation.spring.web.json.JsonSerializer;

import java.util.List;

@Component
@Primary
public class CustomBasePathJsonSerializer extends JsonSerializer {

    private static final String HOST = "k6a201.p.ssafy.io";

    public CustomBasePathJsonSerializer(List<JacksonModuleRegistrar> modules) {
        super(modules);
    }

    @Override
    public Json toJson(Object toSerialize) {
        if (toSerialize instanceof Swagger) {
            Swagger swagger = (Swagger) toSerialize;
            swagger.host(HOST); // 서버 반영시 주석 해제
        }
        return super.toJson(toSerialize);
    }
}