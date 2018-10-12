package com.yu.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yu.demo.service.IDemoViewService;

@Controller
@RequestMapping("/demoView")
public class DemoViewController {
	
	@Autowired
	IDemoViewService demoViewService;

    @RequestMapping("/thymeleaf")
    public String testThymeleaf(Map<String,Object> map) {
        map.put("msg", "Hello Thymeleaf");
        
        map.put("userList", demoViewService.testThymeleaf());

        return "test_thymeleaf";
    }

    @RequestMapping("/freemaker")
    public String testFreemaker(Map<String,Object> map) {
        map.put("msg", "Hello freemarker!");
        return "test_freemarker";
    }
    
    @RequestMapping("/index")
    public String index() {
        return "test_sidebar";
    }
}
