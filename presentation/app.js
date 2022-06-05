function getUser(email, password) {
    fetch("http://localhost:7474/users/"+email+"/"+password, {method: 'get'})
            .then(response => response.json())
            .then(responseJson => {
            if (responseJson.userEmail == email && responseJson.userRole == "employee") {
            window.localStorage.setItem("currentUser", JSON.stringify(responseJson));
            displayEmployeeNav()
            } else if (responseJson.userEmail == email && responseJson.userRole == "admin") {
            window.localStorage.setItem("currentUser", JSON.stringify(responseJson));
            displayManagerNav()
            }
        })
            .catch(
                (error => document.getElementById("message").innerHTML = `Invalid login attempt. Pleae try again.`)
            )
            .finally(
                document.getElementById("email").value = "",
                document.getElementById("pwd").value = ""
            )
} 


function displayEmployeeNav() {
    document.getElementById("here").classList.add("hidden")
    let empNav = `<nav class="navbar navbar-inverse navbar-fixed-top">
                    <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">CorpoCom Internal Reimbursement Request Management System</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#" onclick="logOut()">Logout</a></li>
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

function displayManagerNav() {
    document.getElementById("here").classList.add("hidden")
    let empNav = `<nav class="navbar navbar-inverse navbar-fixed-top">
                    <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">CorpoCom Internal Reimbursement Request Management System</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#" onclick="logOut()">Logout</a></li>
                        <li><a href="#" onclick="displayAddRequestForm()">View/Process all employee pending requests</a></li>
                        <li><a href="#" onclick="getMyRequests()">View all employee resolved requests</a></li>
                        <li><a href="#" onclick="getMyPendingRequests()">View requests by employee</a></li>
                        <li><a href="#" onclick="getMyResolvedRequests()">View information for all employees</a></li>
                    </ul>
                    </div>
                </nav>`
    document.getElementById("content").innerHTML = empNav;
}

function logOut() {
    window.location.reload()
}

function getMyPersonalInfo() {
    current = JSON.parse(window.localStorage.getItem("currentUser"));
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
                            <td>${current.userFirstName}</td>
                            <td>${current.userLastName}</td>
                            <td>${current.userEmail}</td>
                            <td>${current.userPassword}</td>
                            <td><button class="btn btn-danger" type="button" onclick="displayEditPersonalInfo()">Edit Personal Information</button></td>
                            </tr>
                        </tbody></table>`
    document.getElementById("empInfo").innerHTML = currentUserInfo;
}

function displayEditPersonalInfo() {
    let editedPersonalInfo = `<div class="container" style="margin-top: 50px">
    <form>
        <div class="editP">
            <label for="usrFirst" class="form-label">First Name: </label>
            <input type="text" class="form-control form" id="firstName" placeholder=${current.userFirstName} name="usrFirstName">
        </div>
        <div class="editP">
            <label for="usrLast" class="form-label">Last Name:</label>
            <input type="text" class="form-control form" id="lastName" placeholder=${current.userLastName} name="usrLastName">
        </div>
        <div class="editP">
            <label for="usrEmail" class="form-label">Email address:</label>
            <input type="text" class="form-control form" id="emailAddress" placeholder=${current.userEmail} name="usrEmailAddress">
        </div>
        <div class="editP">
            <label for="usrPswd" class="form-label">Email address:</label>
            <input type="text" class="form-control form" id="usrPass" placeholder=${current.userPassword} name="usrPassword">
        </div>
        <button type="button" class="btn btn-primary editP edPbutton" onclick="editPersonalInfo()">Update Personal Info</button>
        <button type="button" class="btn btn-primary editP" onclick="getMyPersonalInfo()">Cancel</button>
    </form>
</div>`
document.getElementById("empInfo").innerHTML = editedPersonalInfo;
}

function editPersonalInfo() {
        let frstName = document.getElementById("firstName").value;
        let lstName = document.getElementById("lastName").value;
        let uEmail = document.getElementById("emailAddress").value;
        let uPass = document.getElementById("usrPass").value;
        if(frstName == "") {
            frstName = current.userFirstName
        }
        if(lstName == "") {
            lstName = current.userLastName
        }
        if(uEmail == "") {
            uEmail = current.userEmail
        }
        if(uPass == "") {
            uPass = current.userPassword
        }

        let editedPersonalInfo = {
            userId: current.userId,
            userFirstName: frstName,
            userLastName: lstName,
            userEmail: uEmail,
            userPassword: uPass,
            userRole: current.userRole
        }
        console.log(current.userEmail)
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
document.getElementById("empInfo").innerHTML = updatedInfo;
    })
}

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
            document.getElementById("empInfo").innerHTML = requestTableData;

        })
        .catch(error => console.log(error));
    
}

function displayAddRequestForm() {
    let requestForm = `<div class="container" style="margin-top: 50px">
                        <form>
                            <div class="editP">
                                <label for="reqAmt" class="form-label">Request Amount:</label>
                                <input type="number" class="form-control form" id="reqAmt" placeholder="Enter request amount" name="requestAmount">
                            </div>
                            <div class="editP">
                                <label for="reqDescr" class="form-label">Request Description:</label>
                                <input type="text" class="form-control form" id="reqDescr" placeholder="Enter request description" name="requestDescription">
                            </div>
                            <div class="editP">
                                <label for="reqImage" class="form-label">Image URL:</label>
                                <input type="text" class="form-control form" id="reqImage" placeholder="Enter image URL (optional)" name="requestImageURL">
                            </div>
                            <button type="button" class="btn btn-primary editP" onclick="addRequest()">Submit New Reimbursement Request</button>
                        </form>
                    </div>`
 document.getElementById("empInfo").innerHTML = requestForm;
}

function getMyRequests() {
    current = JSON.parse(window.localStorage.getItem("currentUser"));
    fetch("http://localhost:7474/requests/"+current.userId, {method: 'get'})
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
            document.getElementById("empInfo").innerHTML = requestTableData;

        })
        .catch(error => console.log(error));
    
}

function getMyPendingRequests() {
    current = JSON.parse(window.localStorage.getItem("currentUser"));
    fetch("http://localhost:7474/requests/"+current.userId, {method: 'get'})
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            let requestTableData = `<table class="table table-bordered">
            <thead>
                <tr>
                <th>request id</th>
                <th>request description</th>
                <th>request amount</th>
                <th>request time</th>
                <th>resolved time</th>
                </tr>
            </thead>
            <tbody>`;
            for(let request of responseJson) {
                if(request.requestStatus == "pending") {
                    requestTableData += `<tr><td>${request.requestId}</td><td>${request.requestDescription}</td><td>${request.requestAmount}</td>
                    <td>${request.requestTime}</td><td>${request.resolvedTime}</td></tr>`
                } 
            }
            requestTableData += `</tbody></table>`;
            document.getElementById("empInfo").innerHTML = requestTableData;

        })
        .catch(error => console.log(error));
    
}

function getMyResolvedRequests() {
    current = JSON.parse(window.localStorage.getItem("currentUser"));
    fetch("http://localhost:7474/requests/"+current.userId, {method: 'get'})
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            let requestTableData = `<table class="table table-bordered">
            <thead>
                <tr>
                <th>request id</th>
                <th>request description</th>
                <th>request amount</th>
                <th>request time</th>
                <th>resolved time</th>
                </tr>
            </thead>
            <tbody>`;
            for(let request of responseJson) {
                if(request.requestStatus == "resolved") {
                    requestTableData += `<tr><td>${request.requestId}</td><td>${request.requestDescription}</td><td>${request.requestAmount}</td>
                    <td>${request.requestTime}</td><td>${request.resolvedTime}</td></tr>`
                }  
            }
            requestTableData += `</tbody></table>`;
            document.getElementById("empInfo").innerHTML = requestTableData;

        })
        .catch(error => console.log(error));
    
}

function addRequest() {
    current = JSON.parse(window.localStorage.getItem("currentUser"));
    const d = new Date();
    let text = d.toUTCString();
    let newRequest = {
        requestId: 0,
        userId: current.userId,
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
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson)
        let newRequest = `
        <h3>Your new request:</h3>
        <table class="table table-bordered">
        <thead>
            <tr>
            <th>request id no.</th>
            <th>request amount</th>
            <th>request description</th>
            <th>request status</th>
            <th>request image url</th>
            <th>request time</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>${responseJson.requestId}</td>
            <td>${responseJson.requestAmount}</td>
            <td>${responseJson.requestDescription}</td>
            <td>${responseJson.requestStatus}</td>
            <td>${responseJson.requestImageURL}</td>
            <td>${responseJson.requestTime}</td>
            </tr>
        </tbody></table>`
document.getElementById("empInfo").innerHTML = newRequest;
})
}




