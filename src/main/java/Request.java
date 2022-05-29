import java.util.List;

import io.javalin.Javalin;
import pojo.RequestPojo;
import pojo.UserPojo;
import service.RequestService;
import service.RequestServiceImpl;
import service.UserService;
import service.UserServiceImpl;

public class Request {

	public static void main(String[] args) {

		RequestService requestService = new RequestServiceImpl();
		UserService userService = new UserServiceImpl();

				
		Javalin server = Javalin.create((config) -> config.enableCorsForAllOrigins()); // javalin creates the jetty server (the default ), we can change the internal server if we want to
		server.start(7474);
		
		server.get("/requests", (ctx)->{
			// here we contact service, service contacts dao 
			// dao fetches all the books and return it back here
			
			// allBooks contains all the books fetched from the DB
			List<RequestPojo> allRequests = requestService.getAllRequests();
			
			//now put the books in the response body, it has to converted to json format, 
			// the ctx.json() will take care of the above 2 and sends back the response to the client/consumer
			ctx.json(allRequests);
			
		});
		
		server.get("/users", (ctx)->{
			// here we contact service, service contacts dao 
			// dao fetches all the books and return it back here
			
			// allBooks contains all the books fetched from the DB
			List<UserPojo> allUsers = userService.getUsers();
			//now put the books in the response body, it has to converted to json format, 
			// the ctx.json() will take care of the above 2 and sends back the response to the client/consumer
			ctx.json(allUsers);
			
		});
	}
}
