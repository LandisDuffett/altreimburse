package service;

import java.util.List;

import dao.UserDao;
import dao.UserDaoImpl;
import exception.ApplicationException;
import pojo.UserPojo;

public class UserServiceImpl implements UserService {
	UserDao userDao;

	public UserServiceImpl() {
		// this.bookDao = new BookDaoImpl();
		this.userDao = new UserDaoImpl();
	}

	@Override
	public List<UserPojo> getUsers() throws ApplicationException {
		// logger.info("Entered getAllBooks() in service.");
		List<UserPojo> allUsers = this.userDao.getUsers();
		// logger.info("Exited getAllBooks() in service.");
		return allUsers;
	}
	
	@Override
	public UserPojo getUser(String userEmail, String userPswd) throws ApplicationException {
		//logger.info("Entered getABook() in service.");
		UserPojo returnUserPojo = this.userDao.getUser(userEmail, userPswd);
		//logger.info("Exited getABook() in service.");
		return returnUserPojo;
	}
	
	@Override
	public UserPojo editUser(UserPojo userPojo, int userId) throws ApplicationException {
		UserPojo updatedUserPojo = this.userDao.editUser(userPojo, userId);
		return updatedUserPojo;
	}
}

