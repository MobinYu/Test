package com.yu.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yu.commom.resultdata.Result;
import com.yu.commom.resultdata.ResultStatus;
import com.yu.user.bean.User;
import com.yu.user.dao.UserDao;
import com.yu.user.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
    private UserDao userDao;
    
    
    @Override
    public boolean addUser(User user) {
        boolean flag=false;
        try{
            userDao.addUser(user);
            flag=true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return flag;
    }

    @Override
    public boolean updateUser(User user) {
        boolean flag=false;
        try{
            userDao.updateUser(user);
            flag=true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return flag;
    }

    @Override
    public boolean deleteUser(int id) {
        boolean flag=false;
        try{
            userDao.deleteUser(id);
            flag=true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return flag;
    }

    @Override
    public User findUserByName(String userName) {
        return userDao.findByName(userName);
    }

    @Override
    public User findUserById(int userId) {
        return userDao.findById(userId);
    }

    @Override
    public Result<User> findUserByAge(int userAge) {
    	User user = new User();
		user.setId(1);
		user.setAge(20);
		user.setName("AASSD");
		
    	Result<User> result = new Result<User>();
//    	result.setData(userDao.findByAge(userAge));
    	result.setData(user);
    	result.setStatus(ResultStatus.Success);
    	
        return result;
    }

}
