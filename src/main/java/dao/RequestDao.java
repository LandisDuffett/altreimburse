package dao;

import java.util.List;

import exception.ApplicationException;
import pojo.RequestPojo;

public interface RequestDao {

	List<RequestPojo> getAllRequests() throws ApplicationException;
}
