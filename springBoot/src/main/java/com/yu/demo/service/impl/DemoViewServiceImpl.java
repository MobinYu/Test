package com.yu.demo.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.yu.demo.service.IDemoViewService;

@Service
public class DemoViewServiceImpl implements IDemoViewService{

	@Override
	public List<Map<String, Object>> testThymeleaf() {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		Map<String, Object> map1 = new HashMap<String, Object>();
		map1.put("index", 1);
		map1.put("name", "张三");
		map1.put("age", 20);
		map1.put("sex", "男");
		
		list.add(map1);
		
		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("index", 2);
		map2.put("name", "李四");
		map2.put("age", 19);
		map2.put("sex", "女");
		
		list.add(map2);
		
		
		return list;
	}

}
