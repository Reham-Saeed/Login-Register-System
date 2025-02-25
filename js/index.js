//inputs
var userSignupName = document.getElementById("userSignupName");
var userSignupEmail = document.getElementById("userSignupEmail");
var userSignupPassword = document.getElementById("userSignupPassword");
var userLoginEmail = document.getElementById("userLoginEmail");
var userLoginPassword = document.getElementById("userLoginPassword");

var signUpArray = [];
var storedUsers = localStorage.getItem("users");
if (storedUsers) {
  signUpArray = JSON.parse(storedUsers);
}
//sign up
function signup() {
  if (
    userSignupName.value == "" ||
    userSignupEmail.value == "" ||
    userSignupPassword.value == ""
  ) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
  } else {
    var isEmailExists = signUpArray.some(
      (user) => user.email === userSignupEmail.value
    );

    if (isEmailExists) {
      document.getElementById("exist").innerHTML =
        '<span class="text-danger m-3">Email already exists</span>';
    } else {
      var signUp = {
        name: userSignupName.value,
        email: userSignupEmail.value,
        password: userSignupPassword.value,
      };
      signUpArray.push(signUp);
      localStorage.setItem("users", JSON.stringify(signUpArray));
      document.getElementById("exist").innerHTML =
        '<span class="text-success m-3">Success</span>';
    }
  }
}

// get page path
var pathparts = location.pathname.split("/");
var baseURL = "";
for (var i = 0; i < pathparts.length - 1; i++) {
  baseURL += "/" + pathparts[i];
}

//login
function login() {
  if (userLoginEmail.value === "" || userLoginPassword.value === "") {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
  } else {
    signUpArray = JSON.parse(localStorage.getItem("users"));
    var isLoggedIn = false;
    for (var i = 0; i < signUpArray.length; i++) {
      if (
        userLoginEmail.value == signUpArray[i].email &&
        userLoginPassword.value == signUpArray[i].password
      ) {
        isLoggedIn = true;
        localStorage.setItem("welcomUsername", signUpArray[i].name);
        if (baseURL == "/") {
          location.replace("https://" + location.hostname + "/home.html");
        } else {
          location.replace(baseURL + "/home.html");
        }
        break;
      }
    }
    if (isLoggedIn != true) {
      document.getElementById("exist").innerHTML =
        '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
  }
}

//display welcom to user
var username = localStorage.getItem("welcomUsername");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

// logout
function logout() {
  localStorage.removeItem("welcomUsername");
  if (baseURL == "/") {
    location.replace("https://" + location.hostname + "/login.html");
  } else {
    location.replace(baseURL + "/login.html");
  }
}
