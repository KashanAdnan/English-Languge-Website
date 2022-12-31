// var port = "https://sir-web.herokuapp.com";
var port = "http://localhost:3000";

function login() {
  var obj = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  var Http = new XMLHttpRequest();
  Http.open("POST", port + "/logIn");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
        console.log(jsonRes)
        swal("Good job!", jsonRes.data , "success");
        setInterval(function () {
          window.location.href = "../Home/home.html";
        }, 3000);
        console.log(jsonRes);
        return;
      }
      else if (Http.status === 201) {
        swal("Good job!", jsonRes.message , "success");
        setInterval(() => {
          window.location.href = "../Admin Panel/index.html"  
        }, 3000);
        // alert(jsonRe/s.message)
      }
      else {
        swal("Opps!", jsonRes.message, "error");
        console.log(jsonRes.message);
      }
    }
  };

  return false;
}
