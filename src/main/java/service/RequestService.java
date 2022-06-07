package service;

import java.util.List;

import exception.ApplicationException;
import pojo.RequestPojo;

public interface RequestService {

	List<RequestPojo> getAllRequests() throws ApplicationException;
	
	RequestPojo addRequest(RequestPojo requestPojo) throws ApplicationException;
	
	List<RequestPojo> getRequestsByEmployee(int userId) throws ApplicationException;
	
	boolean updateRequest(int requestId, String choice) throws ApplicationException;
	
	RequestPojo getRequestInfo(int requestId) throws ApplicationException;
	
	
}