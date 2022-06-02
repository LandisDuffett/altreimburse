package dao;

import java.util.List;

import exception.ApplicationException;
import pojo.UserPojo;

public interface UserDao {

	List<UserPojo> getUsers() throws ApplicationException;
	
	UserPojo getUser(String userEmail, String userPswd) throws ApplicationException;
	
	UserPojo editUser(UserPojo userPojo, int userId) throws ApplicationException;
}
