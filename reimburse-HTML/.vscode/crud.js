function getAllRequests() {

    //just testing 
    console.log("data printed on console")
    //need to consume the endpoint http://localhost:7474/requests to get book details here
    // to do this we can place an asynchronous call to the javalin's jetty server
    // way to do it: XMLHttpRequest or fetch api 
  
  
  
  
    //using fetch api to consume endpoint
    fetch("http://localhost:7474/requests")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        let requestTableData = `<table class= "table table-hover">
        <thead>
          <tr>
          <th>Request ID</th>
          <th>Employee ID</th>
          <th>Amount</th>
          <th>Description</th>
          <th>imageURL</th>
          <th>Request Time</th>
          <th>Resolved Time</th>
          <th>Status</th>
          </tr>
        </thead>
        <tbody> `;
        for (let request of responseJson) {
          requestTableData += `<tr>
                                <td>${request.requestId}</td><td>${request.requestUserId}</td>
                                <td>${request.requestAmount}</td><td>${request.requestDescription}</td>
                                <td>${request.requestImageURL}</td><td>${request.requestTime}</td>
                                <td>${request.resolvedTime}</td><td>${request.requestStatus}</td>
                              </tr> `;
        }
        requestTableData += `</tbody></table>`;
        document.getElementById("content").innerHTML = requestTableData;
      })
      .catch(error => console.log(error));
  
  }
  function getUserRequests(requestUserId) {
    fetch("http://localhost:7474/requests/"+ requestUserId, {method: 'get'})
      .then(response => response.json())
      .then(responseJson => {
       
        let userRequestsData = `<table class= "table table-hover">
        <thead>
          <tr>
          <th>Request ID</th>
          <th>Employee ID</th>
          <th>Amount</th>
          <th>Description</th>
          <th>imageURL</th>
          <th>Request Time</th>
          <th>Resolved Time</th>
          <th>Status</th>
          </tr>
        </thead>
        <tbody> `;
      for (let request of responseJson) {
        if(responseJson.requestUserId == searchbar){
          userRequestsData += `<tr>
                                <td>${request.requestId}</td><td>${request.requestUserId}</td>
                                <td>${request.requestAmount}</td><td>${request.requestDescription}</td>
                                <td>${request.requestImageURL}</td><td>${request.requestTime}</td>
                                <td>${request.resolvedTime}</td><td>${request.requestStatus}</td>
                              </tr> `;
        userRequestsData += `</tbody></table>`;
        document.getElementById("data3").innerHTML = userRequestsData;
      }
    }})
    .catch(error => console.log(error));
  
  }
  
  function getUsers() {
    console.log("data printed on console");
    fetch("http://localhost:7474/users")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        let employeesTableData = `<table class= "table table-hover">
        <thead>
          <tr>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          </tr>
          </thead>
          <tbody>`;
        for (let employee of responseJson) {
          employeesTableData += `<tr>
                                      <td>${employee.userId}</td>
                                      <td>${employee.userFirstName}</td>
                                      <td>${employee.userLastName}</td>
                                      <td>${employee.userEmail}</td>
                                      </tr> `;
        }
        employeesTableData += `</tbody></table>`;
        document.getElementById("employees").innerHTML = employeesTableData;
      })
      .catch(error => console.log(error));
  }
  
  function getPendingRequests() {
    console.log("data printed on console");
    fetch("http://localhost:7474/requests")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        let pendingRequestsData = `<table class= "table table-hover">
        <thead>
          <tr>
          <th>Request ID</th>
          <th>Employee ID</th>
          <th>Amount</th>
          <th>Description</th>
          <th>imageURL</th>
          <th>Request Time</th>
          <th>Resolved Time</th>
          <th>Status</th>
          </tr>
        </thead>
        <tbody> `;
        let requests = [];
         for (let request of responseJson) {
          if (request.requestStatus == "pending") {
            pendingRequestsData += `<tr>
                                <td>${request.requestId}</td><td>${request.requestUserId}</td>
                                <td>${request.requestAmount}</td><td>${request.requestDescription}</td>
                                <td>${request.requestImageURL}</td><td>${request.requestTime}</td>
                                <td>${request.resolvedTime}</td><td>${request.requestStatus}</td>
                                <td> <div class="container">
                                <form>
                                  <div class="form-group">
                                  <div class="col-xs-2"> </div>
                                    <select class="form-control" id="select">
                                      <option>Approve</option>
                                      <option>Deny</option>
                                    </select> 
                                    <input type="button" onclick="updateRequest()" value="update">     
                                  </div>
                                </form>
                              </div>
                              </td>
                              </tr> `;
          pendingRequestsData += `</tbody></table>`;
          document.getElementById("data").innerHTML = pendingRequestsData;
          requests.push(request)
          window.localStorage.setItem("requests",JSON)
        }

      }})
      .catch(error => console.log(error));
  
  }
  
  function getResolvedRequests() {
    console.log("data printed on console");
    fetch("http://localhost:7474/requests")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        let resolvedRequestsData = `<table class= "table table-hover">
          <thead>
            <tr>
            <th>Request ID</th>
            <th>Employee ID</th>
            <th>Amount</th>
            <th>Description</th>
            <th>imageURL</th>
            <th>Request Time</th>
            <th>Resolved Time</th>
            <th>Status</th>
            </tr>
          </thead>
          <tbody> `;
        for (let request of responseJson) {
          if (request.requestStatus == "approved" || "denied") {
            resolvedRequestsData += `<tr>
                                  <td>${request.requestId}</td><td>${request.requestUserId}</td>
                                  <td>${request.requestAmount}</td><td>${request.requestDescription}</td>
                                  <td>${request.requestImageURL}</td><td>${request.requestTime}</td>
                                  <td>${request.resolvedTime}</td><td>${request.requestStatus}</td>
                                </tr> `;
          resolvedRequestsData += `</tbody></table>`;
          document.getElementById("data2").innerHTML = resolvedRequestsData;
        }
      }})
      .catch(error => console.log(error));
  
  }
  
  function updateRequest(){
    var choice = document.getElementById("select");
    console.log();
    fetch("http://localhost:7474/requests", {method: 'put', })
  }
  

    

    
