package com.yu.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yu.demo.service.IHelloWorldService;


@RestController
public class HelloWorldController {
	
	@Autowired
	IHelloWorldService helloWorldService;
	
    @RequestMapping("/hello")
    public String helloWorld() {
        return helloWorldService.helloWorld();
    }
}