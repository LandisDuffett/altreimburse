package service;

import java.util.List;

import exception.ApplicationException;
import pojo.UserPojo;

public interface UserService {
	
	List<UserPojo> getUsers() throws ApplicationException;
	
	UserPojo getUser(String userEmail, String userPswd) throws ApplicationException;
	
	public UserPojo editUser(UserPojo userPojo, int userId) throws ApplicationException;


}
