// var port = "https://sir-web.herokuapp.com";
var port = "http://localhost:3000";

function login() {
  var obj = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  axios.post(port + "/login", { ...obj }).then((res) => {
    swal("Good job!", "Login Succesfully ! ", "success");
    setInterval(() => {
      window.location.href = "../Admin Panel/index.html"
    }, 3000);

  }).catch((err) => {
    swal("Opps!", err.response.data.message, "error");

  })

  return false;
}
axios.get("http://localhost:3000/me").then((res) => {
  window.location.href = "../Home/home.html"
}).catch((err) => {
  console.log(err);
})