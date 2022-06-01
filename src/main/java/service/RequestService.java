package service;

import java.util.List;

import exception.ApplicationException;
import pojo.RequestPojo;

public interface RequestService {

	List<RequestPojo> getAllRequests() throws ApplicationException;
	
	RequestPojo addRequest(RequestPojo requestPojo) throws ApplicationException;

	
}
