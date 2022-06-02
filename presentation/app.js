//let currentUser = {};

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
    document.getElementById("here").classList.add("hidden")
    currentUser = JSON.parse(window.localStorage.getItem("currentUser"))
    let empNav = `<nav class="navbar navbar-inverse navbar-fixed-top">
                    <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">CorpoCom Internal Reimbursement Request Management System</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Logout</a></li>
                        <li><a href="#" onclick="displayAddRequestForm()">Submit New Request</a></li>
                        <li><a href="#" onclick="getMyRequests()">Get My Requests</a></li>
                        <li><a href="#" onclick="getMyPendingRequests()">See All My Pending Requests</a></li>
                        <li><a href="#" onclick="getMyResolvedRequests()">See All My Resolved Requests</a></li>
                        <li><a href="#" onclick="getMyPersonalInfo()">View/Edit My Personal Information</a></li>
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

function getMyPersonalInfo() {
    currentUser = JSON.parse(window.localStorage.getItem("currentUser"))
    let currentUserInfo = `<table class="table table-bordered">
                        <thead>
                            <tr>
                            <th>first name</th>
                            <th>last name</th>
                            <th>email address</th>
                            <th>password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>${currentUser.userFirstName}</td>
                            <td>${currentUser.userLastName}</td>
                            <td>${currentUser.userEmail}</td>
                            <td>${currentUser.userPassword}</td>
                            <td><button class="btn btn-danger" type="button" onclick="displayEditPersonalInfo()">Edit Personal Information</button></td>
                            </tr>
                        </tbody></table>`
    document.getElementById("here").innerHTML = currentUserInfo;
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
                <th>request description</th>
                <th>request amount/th>
                <th>request status</th>
                <th>request time</th>
                <th>resolved time</th>
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

function displayEditPersonalInfo() {
    let editedPersonalInfo = `<div class="container" style="margin-top: 50px">
    <form>
        <div class="mb-3 mt-3">
            <label for="usrFirst" class="form-label">First Name: </label>
            <input type="text" class="form-control" id="firstName" placeholder=${currentUser.userFirstName} name="usrFirstName">
        </div>
        <div class="mb-3 mt-3">
            <label for="usrLast" class="form-label">Last Name:</label>
            <input type="text" class="form-control" id="lastName" placeholder=${currentUser.userLastName} name="usrLastName">
        </div>
        <div class="mb-3 mt-3">
            <label for="usrEmail" class="form-label">Email address:</label>
            <input type="text" class="form-control" id="emailAddress" placeholder=${currentUser.userEmail} name="usrEmailAddress">
        </div>
        <div class="mb-3 mt-3">
            <label for="usrPswd" class="form-label">Email address:</label>
            <input type="text" class="form-control" id="usrPass" placeholder=${currentUser.userPassword} name="usrPassword">
        </div>
        <button type="button" class="btn btn-primary" onclick="editPersonalInfo()">Update Personal Info</button>
        <button type="button" class="btn btn-primary" onclick="clear()">Cancel</button>
    </form>
</div>`
document.getElementById("here").innerHTML = editedPersonalInfo;
}

function editPersonalInfo() {
        let frstName = document.getElementById("firstName").value;
        let lstName = document.getElementById("lastName").value;
        let uEmail = document.getElementById("emailAddress").value;
        let uPass = document.getElementById("usrPass").value;
        if(frstName == "") {
            frstName = currentUser.userFirstName
        }
        if(lstName == "") {
            lstName = currentUser.userLastName
        }
        if(uEmail == "") {
            uEmail = currentUser.userEmail
        }
        if(uPass == "") {
            uPass = currentUser.userPassword
        }

        let editedPersonalInfo = {
            userId: currentUser.userId,
            userFirstName: frstName,
            userLastName: lstName,
            userEmail: uEmail,
            userPassword: uPass,
            userRole: currentUser.userRole
        }
        console.log(currentUser.userEmail)
        fetch("http://localhost:7474/users", {
            method: 'put',
            body: JSON.stringify(editedPersonalInfo)
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            let updatedInfo = `
            <h3>Your updated personal info:</h3>
            <table class="table table-bordered">
            <thead>
                <tr>
                <th>first name</th>
                <th>last name</th>
                <th>email address</th>
                <th>password</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>${responseJson.userFirstName}</td>
                <td>${responseJson.userLastName}</td>
                <td>${responseJson.userEmail}</td>
                <td>${responseJson.userPassword}</td>
                </tr>
            </tbody></table>`
document.getElementById("here").innerHTML = updatedInfo;
        })
    }

function clear() {
   
}

function getMyPendingRequests() {
    fetch("http://localhost:7474/requests/"+currentUser.userId, {method: 'get'})
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            let requestTableData = `<table class="table table-bordered">
            <thead>
                <tr>
                <th>request id</th>
                <th>request description</th>
                <th>request amount/th>
                <th>request status</th>
                <th>request time</th>
                <th>resolved time</th>
                </tr>
            </thead>
            <tbody>`;
            for(let request of responseJson) {
                if(request.requestStatus == "pending") {
                    requestTableData += `<tr><td>${request.requestId}</td><td>${request.requestDescription}</td><td>${request.requestAmount}</td><td>${request.requestStatus}</td>
                    <td>${request.requestTime}</td><td>${request.resolvedTime}</td></tr>`
                } 
            }
            requestTableData += `</tbody></table>`;
            document.getElementById("content").innerHTML = requestTableData;

        })
        .catch(error => console.log(error));
    
}

function getMyResolvedRequests() {
    fetch("http://localhost:7474/requests/"+currentUser.userId, {method: 'get'})
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            let requestTableData = `<table class="table table-bordered">
            <thead>
                <tr>
                <th>request id</th>
                <th>request description</th>
                <threquest amount/th>
                <th>request status</th>
                <th>request time</th>
                <th>resolved time</th>
                </tr>
            </thead>
            <tbody>`;
            for(let request of responseJson) {
                if(request.requestStatus == "resolved") {
                    requestTableData += `<tr><td>${request.requestId}</td><td>${request.requestDescription}</td><td>${request.requestAmount}</td><td>${request.requestStatus}</td>
                    <td>${request.requestTime}</td><td>${request.resolvedTime}</td></tr>`
                }  
            }
            requestTableData += `</tbody></table>`;
            document.getElementById("content").innerHTML = requestTableData;

        })
        .catch(error => console.log(error));
    
}


