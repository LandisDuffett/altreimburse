currentUserId = 0;
let loginF = document.getElementById("here");
let currentUser = {};


function getRequests() {
    fetch("http://localhost:7474/requests")
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            let requestTableData = `<table class="table table-bordered">
            <thead>
                <tr>
                <th>request id</th>
                <th>user id</th>
                <th>request description</th>
                <th>request amount</th>
                </tr>
            </thead>
            <tbody>`;
            for(let request of responseJson) {
                requestTableData += `<tr><td>${request.requestId}</td><td>${request.userId}</td><td>${request.requestDescription}</td><td>${request.requestAmount}</td></tr>`
            }
            requestTableData += `</tbody></table>`;
            document.getElementById("content").innerHTML = requestTableData;

        })
        .catch(error => console.log(error));
    
}

function displayAddRequestForm() {
    let requestForm = `<div class="container" style="margin-top: 50px">
                        <form>
                            <div class="mb-3 mt-3">
                                <label for="reqAmt" class="form-label">Request Amount:</label>
                                <input type="number" class="form-control" id="reqAmt" placeholder="Enter request amount" name="requestAmount">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="reqDescr" class="form-label">Request Description:</label>
                                <input type="text" class="form-control" id="reqDescr" placeholder="Enter request description" name="requestDescription">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="reqImage" class="form-label">Image URL:</label>
                                <input type="text" class="form-control" id="reqImage" placeholder="Enter image URL (optional)" name="requestImageURL">
                            </div>
                            <button type="button" class="btn btn-primary" onclick="addRequest()">Submit New Reimbursement Request</button>
                        </form>
                    </div>`
 document.getElementById("here").innerHTML = requestForm;
}

function displayEmployeeNav() {
    currentUser = JSON.parse(window.localStorage.getItem("currentUser"))
    let empNav = `<nav class="navbar navbar-inverse navbar-fixed-top">
                    <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">CorpoCom Internal Reimbursement Request Management System</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Logout</a></li>
                        <li><a href="#">Submit Request</a></li>
                        <li><a href="#" onclick="displayAddRequestForm()">Submit New Request</a></li>
                        <li><a href="#" onclick="getMyRequests()">Get My Requests</a></li>
                    </ul>
                    </div>
                </nav>`
    document.getElementById("content").innerHTML = empNav;
}

function getUsers() {

}

function addRequest() {
    //console.log(currentUserId)
    const d = new Date();
    let text = d.toUTCString();
    let newRequest = {
        requestId: 0,
        userId: currentUser.userId,
        requestAmount:document.getElementById("reqAmt").value,
        requestDescription:  document.getElementById("reqDescr").value,
        requestStatus: "pending",
        requestImageURL:document.getElementById("reqImage").value,
        requestTime: text,
        resolvedTime: ""
        
    }
    fetch("http://localhost:7474/requests", {
        method: 'post',
        body: JSON.stringify(newRequest)
    })
    .then(response => console.log(response))
}

function getRequestsByUser() {

}

function getUser(email, password) {
    fetch("http://localhost:7474/users/"+email+"/"+password, {method: 'get'})
        .then(response => response.json())
        .then(responseJson => {
        if(responseJson.userEmail == email) {
        //console.log(responseJson.userId)
        //currentUserId = responseJson.userId;
        //console.log(currentUserId)
        //
        window.localStorage.setItem("currentUser", JSON.stringify(responseJson));
        }
        /*
        let requestTableData3 = ""
        requestTableData3 += `<button class="button" type="button" onclick="primtMyRequests()">Print My Requests</button>`
        document.getElementById("currentUser").innerHTML = requestTableData3;
        */
       console.log(responseJson);
     
        })
       // .then(window.location.href="./employee.html")
       .then(displayEmployeeNav())
}

function getMyRequests() {
    fetch("http://localhost:7474/requests/"+currentUser.userId, {method: 'get'})
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            let requestTableData = `<table class="table table-bordered">
            <thead>
                <tr>
                <th>request id</th>
                <th>user id</th>
                <th>request description</th>
                <th>request amount</th>
                </tr>
            </thead>
            <tbody>`;
            for(let request of responseJson) {
                requestTableData += `<tr><td>${request.requestId}</td><td>${request.requestDescription}</td><td>${request.requestAmount}</td><td>${request.requestStatus}</td>
                <td>${request.requestTime}</td><td>${request.resolvedTime}</td></tr>`
            }
            requestTableData += `</tbody></table>`;
            document.getElementById("content").innerHTML = requestTableData;

        })
        .catch(error => console.log(error));
    
}

/*
function printMyRequests() {
    fetch("http://localhost:7474/requests")
        .then(response => response.json())
        .then(responseJson => {
            console.log(thisid)
            console.log(responseJson)
            let requestTableData2 = `<table class="table table-bordered">
            <thead>
                <tr>
                <th>request id</th>
                <th>request description</th>
                <th>request amount</th>
                </tr>
            </thead>
            <tbody>`;
            for(let request of responseJson) {
                if (request.userId == thisid) {
                    requestTableData2 += `<tr><td>${request.requestId}</td><td>${request.requestDescription}</td><td>${request.requestAmount}</td></tr>`
                }
            }
            requestTableData2 += `</tbody></table>`;
            document.getElementById("myrequests").innerHTML = requestTableData2;

        })
        .catch(error => console.log(error));
    
}
*/

