let thisEmail = "";
let thispswd = "";
let thisid = 0;

function printData() {

 

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

function getUser(email, pswd) {
   // console.log("id value is: ");
    fetch("http://localhost:7474/users")
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
        //let thisuser
        console.log(email)
        for(let user of responseJson) {
            if(user.userEmail == email && user.userPassword == pswd) {
              thisEmail = email
              thispswd = pswd
              thisid = user.userId
            }
        }
        
        let requestTableData3 = ""
        requestTableData3 += `<button class="button" type="button" onclick="primtMyRequests()">Print My Requests</button>`
        document.getElementById("currentUser").innerHTML = requestTableData3;

        })
}
         //   let userrole = thisuser.userRole
         //   if(userrole = "admin") {
        //        printData();
        //    }
     //   })
     //   console.log("this user is as follows: ", thisuser)
        