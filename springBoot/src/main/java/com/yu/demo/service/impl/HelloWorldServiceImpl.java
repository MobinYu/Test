package com.yu.demo.service.impl;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yu.demo.model.SpringBootWorld;
import com.yu.demo.service.IHelloWorldService;

@Service
public class HelloWorldServiceImpl implements IHelloWorldService{

	@Override
	public String helloWorld() {
		
		String result = "";
		
		SpringBootWorld bootWorld = new SpringBootWorld();
		bootWorld.setVersion("2.0.2");
		bootWorld.setFeature("my first spring boot!");
		bootWorld.setConfigure("It would give us an opportunity to redeploy our resources.");
		
		ObjectMapper mapper = new ObjectMapper();
		
		//jackson:java对象转json字符串
		try {
			result = mapper.writeValueAsString(bootWorld);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		//jackson:json字符串转java对象
		try {
			SpringBootWorld fromJson = mapper.readValue(result, SpringBootWorld.class);
			System.out.println(fromJson);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return "hello,world";
	}
	
	

}
