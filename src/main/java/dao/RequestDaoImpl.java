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

}
