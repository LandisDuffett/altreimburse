package service;

import java.util.List;

import exception.ApplicationException;
import pojo.UserPojo;

public interface UserService {
	
	List<UserPojo> getUsers() throws ApplicationException;

}
