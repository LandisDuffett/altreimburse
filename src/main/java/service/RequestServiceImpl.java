package service;

import java.util.List;

import exception.ApplicationException;
import pojo.RequestPojo;
import dao.RequestDao;
import dao.RequestDaoImpl;

public class RequestServiceImpl implements RequestService {
	RequestDao requestDao;
	
	public RequestServiceImpl() {
		//this.bookDao = new BookDaoImpl();
		this.requestDao = new RequestDaoImpl();
	}
	
	@Override
	public List<RequestPojo> getAllRequests() throws ApplicationException {
		// logger.info("Entered getAllBooks() in service.");
		List<RequestPojo> allRequests = this.requestDao.getAllRequests();
		// logger.info("Exited getAllBooks() in service.");
		return allRequests;
	}

}
