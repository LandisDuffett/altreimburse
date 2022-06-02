package dao;

import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import exception.ApplicationException;
import pojo.RequestPojo;

public class RequestDaoImpl implements RequestDao {

	@Override
	public List<RequestPojo> getAllRequests() throws ApplicationException {
		// TODO Auto-generated method stub
		List<RequestPojo> allRequests = new ArrayList<RequestPojo>();

		Statement stmt;
		try {
			Connection conn = DBUtil.makeConnection();
			stmt = conn.createStatement();
			String query = "select * from requests";
			//System.out.println("hello");
			ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {
				// here as we iterate through the rs we should
				// each record in a pojo object and
				// add it to the collection
				// and at the end we return the collection

				// as we iterate we are taking each record and storing it in a requestPojo object
				RequestPojo requestPojo = new RequestPojo(rs.getInt(1), rs.getInt(2), rs.getDouble(3), rs.getString(4),
						rs.getString(5), rs.getString(6), rs.getString(7), rs.getString(8));

				// add the bookPojo obj to a collection
				allRequests.add(requestPojo);

			}
		} catch (SQLException e) {
			throw new ApplicationException(e.getMessage());
		}
	
		return allRequests;
	}
	
	public List<RequestPojo> getRequestsByEmployee(int userId) throws ApplicationException {
		// TODO Auto-generated method stub
		List<RequestPojo> empRequests = new ArrayList<RequestPojo>();

		Statement stmt;
		try {
			Connection conn = DBUtil.makeConnection();
			stmt = conn.createStatement();
			String query = "select * from requests where request_userid="+userId+"";
			//System.out.println("hello");
			ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {
				// here as we iterate through the rs we should
				// each record in a pojo object and
				// add it to the collection
				// and at the end we return the collection

				// as we iterate we are taking each record and storing it in a requestPojo object
				RequestPojo requestPojo = new RequestPojo(rs.getInt(1), rs.getInt(2), rs.getDouble(3), rs.getString(4),
						rs.getString(5), rs.getString(6), rs.getString(7), rs.getString(8));

				// add the bookPojo obj to a collection
				empRequests.add(requestPojo);

			}
		} catch (SQLException e) {
			throw new ApplicationException(e.getMessage());
		}
	
		return empRequests;
	}
	
	@Override
	public RequestPojo addRequest(RequestPojo requestPojo) throws ApplicationException {
		
		// this bookPojo does not have a book id set in it.
				
		try {
			// jdbc steps 3 and 4
			Connection conn = DBUtil.makeConnection();
			Statement stmt = conn.createStatement();
//			String query = "insert into book_details(book_title, book_author, book_genre, book_cost, book_removed)" 
//							+ "values('"+bookPojo.getBookTitle()+"','"+bookPojo.getBookAuthor()
//							+"','"+bookPojo.getBookGenre()+"',"+bookPojo.getBookCost()
//							+","+bookPojo.isBookRemoved()+")";
//			
//			int rowsAffected = stmt.executeUpdate(query);
//			if(rowsAffected != 0) { // means the record got inserted successfully
//				// take out the primary key and store in the bookPojo object
//				bookPojo.setBookId(1);// hard coded to 1 - but later will figure out to fetch the generated
//										// primary key from DB
//			}
			
			// fixed the code to return the generated book_id
			String query = "insert into requests(request_userid, request_amount, request_description, request_status, request_imagurl, request_requesttime, request_resolvedtime)" 
					+ "values("+requestPojo.getUserId()+","+requestPojo.getRequestAmount()
					+",'"+requestPojo.getRequestDescription()+"','"+requestPojo.getRequestStatus()
					+"','"+requestPojo.getRequestImageURL()+"','"+requestPojo.getRequestTime()+"','"+requestPojo.getResolvedTime()+"') returning request_id";
			ResultSet rs = stmt.executeQuery(query);
			rs.next();
			requestPojo.setRequestId(rs.getInt(1));
		} catch (SQLException e) {
			throw new ApplicationException(e.getMessage());
		}
		
		return requestPojo;
	}
	

}
