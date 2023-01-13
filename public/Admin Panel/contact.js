const url = "http://localhost:3000";

function getData() {
  var showdata = document.getElementById("showdata");
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/condata");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      let out;
      var i = 1;
      if (jsonRes === " ") {
        showdata.innerHTML = "No Yet";
      }
      jsonRes.map((data) => {
        console.log(data);
        out = `
    <tbody>
    <tr id="${data._id}">
    <td>${i++}</td>
    <td>${data.firstname} ${data.lastname}</td>
                        <td>${data.email}</td>
                        <td>${data.messgae}</td>
                        <td><button class="buttons" href="javascript:void(0)" onclick="delete_data('${
                          data._id
                        }')"><i class="fa-solid fa-trash-can"></i></button></td>
                        <td><button class="buttons-blue" href="javascript:void(0)" onclick="getting_data('${
                          data._id
                        }' , '${data.firstname}', '${data.email}', '${
          data.messgae
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
    .delete(`http://localhost:3000/condelete/${id}`)
    .then((response) => {
      // setInterval(() => {
      window.location.reload();
      // }, 100);
    })
    .catch((err) => {
      alert(err);
    });
}

function getting_data(_id, firstname, email, messgae) {
  console.log(_id);
  document.getElementById(_id).innerHTML = `
  <tr id='${_id}'>
  <td>1</td>
  <td><input type='text' class='stDname' id='${_id}-stDname' value='${firstname}' width='40'></td>
  <td><input type='text' class='email'  id='${_id}-email'value='${email}' width='40'></td>
  <td><input type='text' class='email'  id='${_id}-messgae'value='${messgae}' width='40'></td>
    <td><button class="buttons" href="javascript:void(0)" onclick="delete_data('${_id}')"><i class="fa-solid fa-trash-can"></i></button></td>
  <td><button class="buttons-blue" href="javascript:void(0)" onclick="updating_data('${_id}')"><i class="fa-solid fa-pencil"></i></button></td>
  </tr>
  `;
}

function updating_data(id) {
  const url = "http://localhost:3000";
  const Http = new XMLHttpRequest();
  Http.open("PUT", url + `/Contactupdate/${id}`);
  Http.setRequestHeader("Content-Type", "application/json");
  let obj = {
    username: document.getElementById(`${id}-stDname`).value,
    email: document.getElementById(`${id}-email`).value,
    messgae: document.getElementById(`${id}-messgae`).value,
  };
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      if (Http.status === 200) {
        let jsonRes = JSON.parse(Http.responseText);
        alert(jsonRes.message);
        window.location.reload();
      } else {
        let jsonRes = JSON.parse(Http.responseText);
        alert(jsonRes.message);
      }
    }
  };

  return false;
}
