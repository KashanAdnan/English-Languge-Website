const url = "http://localhost:3000";

function getData() {
  var showdata = document.getElementById("showdata");
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/admin");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      let out;
      var i = 1;
      jsonRes.map((data) => {
        console.log(data)
        out = `
    <tbody>
    <tr id="${data._id}">
    <td>${i++}</td>
    <td>${data.username}</td>
                        <td>${data.email}</td>
                        <td><a href="tel:${data.phone}">${
          data.phone
        }</a></td>
                        <td><button class="buttons" href="javascript:void(0)" onclick="delete_data('${
                          data._id
                        }')"><i class="fa-solid fa-trash-can"></i></button></td>
                        <td><button class="buttons-blue" href="javascript:void(0)" onclick="getting_data('${
                          data._id
                        }' , '${data.username}' , '${data.phone}', '${
          data.email
        }')"><i class="fa-solid fa-pencil"></i></button></td>
        </tr>
        </tbody>
        `;
        showdata.innerHTML += out;
      });
    }
  };
}
getData();
function delete_data(id) {
  console.log(id);
  axios
    .delete(`http://localhost:3000/delete/${id}`)
    .then((response) => {
      // setInterval(() => {
        window.location.reload();
      // }, 2000);
    })
    .catch((err) => {
      alert(err);
    });
}

function getting_data(_id, username, phone, email) {
  console.log(_id);
  document.getElementById(_id).innerHTML = `
  <tr id='${_id}'>
  <td>1</td>
  <td><input type='text' class='username' id='${_id}-username' value='${username}' width='40'></td>
  <td><input type='text' class='email'  id='${_id}-email'value='${email}' width='40'></td>
  <td><input type='text' class='phone' id='${_id}-phone' value='${phone}' width='40'></td>
  <td><button class="buttons" href="javascript:void(0)" onclick="delete_data('${_id}')"><i class="fa-solid fa-trash-can"></i></button></td>
  <td><button class="buttons-blue" href="javascript:void(0)" onclick="updating_data('${_id}')"><i class="fa-solid fa-pencil"></i></button></td>
  </tr>
  `;
}
function updating_data(id) {
  console.log("helll");
  const username = document.getElementById(`${id}-username`).value;
  const email = document.getElementById(`${id}-email`).value;
  const phone = document.getElementById(`${id}-phone`).value;
  console.log(username);
  console.log(email);
  console.log(phone);
  console.log(id)
  axios
    .put(`http://localhost:3000/update/${id}`, {
      username: username,
      email: email,
      phone: phone,
    })
    .then((reponse) => {
      // alert(reponse.data.message);
      // setInterval(() => {
        window.location.reload();
      // }, 2000);
      // console.log(reponse);
    })
    .catch((err) => {
      alert(err);
    });
}
