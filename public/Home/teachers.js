var port = "http://localhost:3000";

function sinup() {
    var teachobj = {
      teachusername: document.getElementById("techusername").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confPassword: document.getElementById("confPassword").value,
    };
    console.log(teachobj);
  var obj = {
    teachusername: document.getElementById("techusername").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confPassword: document.getElementById("confPassword").value,
  };
  console.log(obj);
  var Http = new XMLHttpRequest();
  Http.open("POST", port + "/Teachers");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
        console.log(jsonRes);
        alert(jsonRes.message);
        console.log(jsonRes);
        return;
      } else {
        alert(jsonRes.message);
        console.log(jsonRes.message);
      }
    }
  };

  return false;
}
