package dao;

import java.util.List;

import exception.ApplicationException;
import pojo.RequestPojo;

public interface RequestDao {

	List<RequestPojo> getAllRequests() throws ApplicationException;
	
	RequestPojo addRequest(RequestPojo requestPojo) throws ApplicationException;
	
	List<RequestPojo> getRequestsByEmployee(int userId) throws ApplicationException;

	RequestPojo updateRequest(RequestPojo requestPojo, int userId) throws ApplicationException;
}
