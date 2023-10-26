var port = "http://localhost:3000";

function sinup() {
  var obj = {
    email: document.getElementById("email").value,
    name: document.getElementById("username").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    confirm_password: document.getElementById("confirm-password").value,
  };
  axios.post(port + "/register", { ...obj }).then((res) => {
    Swal.fire(
      'Good job!',
      'Register Succesfully!!',
      'success'
    )
    setInterval(function () {
      window.location.href = "../Home/home.html";
    }, 3000);
  }).catch((error) => {
    Swal.fire(
      'OOPS!',
      error.response.data.message,
      'error'
    )
  })
  return false;
}

axios.get("http://localhost:3000/me").then((res) => {
  window.location.href = "./Home/home.html"
}).catch((err) => {
  console.log(err);
})