let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/*This method is used to return Time in HHMMSS format 
 * @returns HHMMSS
 */
function showTime() {
    const date = new Date();
    return date.getHours() + "-Hrs:" + date.getMinutes() + "-Mins:" + date.getSeconds() + "-Secs";
}

/*This method is used to execute JsonServerHTMLrequest and return error or data 
 * @param Method type, url, CallbackMethos, asyn type, data is passed
 */
function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.open(methodType, url, async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 client Error or 500 server error");
            }
        }
    }
    if(data){
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else
         xhr.send(); 
    console.log(methodType + " request sent to the server at " + showTime());
}

// To print the existing data in url
const getURL = "http://localhost:3000/employees/14";
function getUserDetails(data) {
    console.log("Get User Data at " + showTime() + " " + data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made Ajax call to server  at " + showTime());

// To print the deleted data in url
const deleteURL = "http://localhost:3000/employees/18";
function userDelete(data) {
    console.log("user deleted" + data);
}
makeAJAXCall("DELETE", deleteURL, userDelete, false);
console.log("Made Ajax call to server  at " + showTime());

// To add the data into url
const postURL = "http://localhost:3000/employees";
const emplData ={"name":"Manu","Salary":"330002.32"}
function userAdded(data) {
    console.log("user Added at: " + showTime() +" data: "+data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);
console.log("Made Ajax call to server  at " + showTime());



