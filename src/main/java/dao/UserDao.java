package dao;

import java.util.List;

import exception.ApplicationException;
import pojo.UserPojo;

public interface UserDao {

	List<UserPojo> getUsers() throws ApplicationException;
}
