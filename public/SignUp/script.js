var port = "http://localhost:3000";

function sinup() {
  var obj = {
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    confPassword: document.getElementById("confirm-password").value,
  };
  var Http = new XMLHttpRequest();
  Http.open("POST", port + "/signUp");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
        console.log(jsonRes);
        swal("Good job!", jsonRes.message, "success");
        setInterval(function () {
          window.location.href = "../Home/home.html";
        }, 3000);
        console.log(jsonRes);
        return;
      } else {
        swal("Opps!", jsonRes.message, "error");
        console.log(jsonRes.message);
      }
    }
  };

  return false;
}