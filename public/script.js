// const { default: axios } = require("axios");

// var port = "https://sir-web.herokuapp.com";
var port = "http://localhost:3000";
const sinup = () => {
  var obj = {
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    confPassword: document.getElementById("confirm-password").value,
  };
axios.post(port+'/signUp',{
  email:obj.email,
  username:obj.username,
  phone:obj.phone,
  password:obj.password,
  confpassword:obj.confPassword

}).then((response)=>{
  swal("Good job!", response.data.message , "success");
  setInterval(() => {
    window.location.href = "./Login/login.html";
  }, 3000);
}).catch((err)=>{
  swal("Opps!", err.response.data.message , "error");
})

  return false;
};
