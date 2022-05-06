package com.jeans.bloom;

import nonapi.io.github.classgraph.json.JSONUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BloomApplication {

    public static void main(String[] args) {
        System.setProperty("server.servlet.context-path", "/api");
        SpringApplication.run(BloomApplication.class, args);
    }

}