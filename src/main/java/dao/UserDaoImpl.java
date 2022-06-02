package dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import exception.ApplicationException;
import pojo.UserPojo;

public class UserDaoImpl implements UserDao {

	@Override
	public List<UserPojo> getUsers() throws ApplicationException {
		// TODO Auto-generated method stub
		List<UserPojo> allUsers = new ArrayList<UserPojo>();

		Statement stmt;
		try {
			Connection conn = DBUtil.makeConnection();
			stmt = conn.createStatement();
			String query = "select * from users";
			ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {
				// here as we iterate through the rs we should
				// each record in a pojo object and
				// add it to the collection
				// and at the end we return the collection
				// as we iterate we are taking each record and storing it in a requestPojo object
				UserPojo userPojo = new UserPojo(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4),
						rs.getString(5), rs.getString(6));

				// add the bookPojo obj to a collection
				allUsers.add(userPojo);

			}
		} catch (SQLException e) {
			throw new ApplicationException(e.getMessage());
		}
	
		return allUsers;
	}
	
	@Override
	public UserPojo getUser(String userEmail, String userPswd) throws ApplicationException {
	
		Statement stmt;
		UserPojo userPojo = null;
		try {
			Connection conn = DBUtil.makeConnection();
			stmt = conn.createStatement();
			String query = "select * from users where user_email='"+userEmail + "' and user_password='"+userPswd+"'";
			
			ResultSet rs = stmt.executeQuery(query);
			
			if(rs.next()) {
				userPojo = new UserPojo(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4),
						rs.getString(5), rs.getString(6));
			}
		} catch (SQLException e) {
			throw new ApplicationException(e.getMessage());
		}
	
		return userPojo;
	}
	
	@Override
	public UserPojo editUser(UserPojo userPojo, int userId) throws ApplicationException {
		
		Statement stmt;
	
		try {
			Connection conn = DBUtil.makeConnection();
			stmt = conn.createStatement();
			String query = "update users set user_firstname = '"+userPojo.getUserFirstName()+"', user_lastname = '"+userPojo.getUserLastName()+"', user_email = '"+userPojo.getUserEmail()+"', user_password = '"+userPojo.getUserPassword()+"' where user_id ="+userId+"";			
			int rowsAffected = stmt.executeUpdate(query);
			
			if(rowsAffected > 0) {
			String query2 = "select * from users where user_id="+userPojo.getUserId()+"";
			ResultSet rs = stmt.executeQuery(query2);
			if(rs.next()) {
				userPojo = new UserPojo(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4),
						rs.getString(5), rs.getString(6));
			}
			}
		} catch (SQLException e) {
			throw new ApplicationException(e.getMessage());
		}
	
		return userPojo;
	}
}
