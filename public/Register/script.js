// var port = "https://sir-web.herokuapp.com";
var port = "http://localhost:3000"

function admit() {
  console.log("hello");
  var obj = {
    stDname: document.getElementById("username").value,
    age: document.getElementById("age").value,
    email: document.getElementById("email").value,
    contactno: document.getElementById("phone").value,
    adress: document.getElementById("adress").value,
    nationality: document.getElementById("nation").value,
    placeofBIrth: document.getElementById("placeofbirth").value,
    level: document.getElementById("level").value,
  };
  var Http = new XMLHttpRequest();
  Http.open("POST", port + "/admission");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
  console.log(obj);
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      console.log(Http.status);
      var jsonRes = JSON.parse(Http.responseText);
      var stDname = document.getElementById("username");
      var age = document.getElementById("age");
      var email = document.getElementById("email");
      var contactno = document.getElementById("phone");
      var adress = document.getElementById("adress");
      var nationality = document.getElementById("nation");
      var placeofBIrth = document.getElementById("placeofbirth");
      var level = document.getElementById("level");
      var jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
        if (stDname.value === " ") {
          swal("Opps!", "Please Write Your Name", "error");
        }
        if (email.value === " ") {
          swal("Opps!", "Please Write Your email", "error");
        }
        if (age.value === " ") {
          swal("Opps!", "Please Write Your age", "error");
        }
        if (contactno.value === " ") {
          swal("Opps!", "Please Write Your contact", "error");
        }
        if (adress.value === " ") {
          swal("Opps!", "Please Write Your adress", "error");
        }
        if (nationality.value === " ") {
          swal("Opps!", "Please Write Your nationality", "error");
        }
        if (placeofBIrth.value === " ") {
          swal("Opps!", "Please Write Your place of Birth", "error");
        } else {
          swal("Good job!", jsonRes.message, "success");
          setInterval(function () {
            window.location.href = "../Home/home.html";
          });
        }
      } else if (Http.status === 405) {
        console.log(Http.status);
        swal("Opps!", jsonRes.message, "error");
      }
    }
  };

  return false;
}
