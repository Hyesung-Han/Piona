package com.jeans.bloom.api.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(value = {"*"}, maxAge = 6000)
@Api(value = "HomeController", tags = "HomeController", description = "메인화면 컨트롤러")
public class HomeController {

    @GetMapping("/all")
    public String getAll(){
        return "hello";
    }
}
