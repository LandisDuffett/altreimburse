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
	
	@Override
	public List<RequestPojo> getRequestsByEmployee(int userId) throws ApplicationException {
		// logger.info("Entered getAllBooks() in service.");
		List<RequestPojo> empRequests = this.requestDao.getRequestsByEmployee(userId);
		// logger.info("Exited getAllBooks() in service.");
		return empRequests;
	}
	
	@Override
	public RequestPojo addRequest(RequestPojo requestPojo) throws ApplicationException {
		//logger.info("Entered addBook() in service.");
		RequestPojo returnRequestPojo = this.requestDao.addRequest(requestPojo);
		//logger.info("Exited addBook() in service.");
		return returnRequestPojo;
	}
	@Override
	public boolean updateRequest(int requestId, String choice) throws ApplicationException{
		boolean returnStatus = this.requestDao.updateRequest(requestId, choice);
		return returnStatus;
	}
	public RequestPojo getRequestInfo(int requestId) throws ApplicationException{
		RequestPojo returnRequestPojo = this.requestDao.getRequestInfo(requestId);
		return returnRequestPojo;
	}
	
}
