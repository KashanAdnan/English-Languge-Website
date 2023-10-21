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
      'You clicked the button!',
      'success'
    )
    setInterval(function () {
      window.location.href = "../Home/home.html";
    }, 3000);
  }).catch((error) => {
    console.log(error);Swal.fire(
      'Good job!',
      'You clicked the button!',
      'errorr'
    )
  })



  return false;
}