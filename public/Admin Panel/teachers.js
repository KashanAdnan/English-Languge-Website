const url = "http://localhost:3000";

function getData() {
  var showdata = document.getElementById("showdata");
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/teacherdata");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      let out;
      var i = 1;
      if (jsonRes === " ") {
        showdata.innerHTML = "No Yet"
      }
      jsonRes.map((data) => {
        console.log(data)
        out = `
    <tbody>
    <tr id="${data._id}">
    <td>${i++}</td>
    <td>${data.teachusername}</td>
                        <td>${data.email}</td>
                        <td><button class="buttons" href="javascript:void(0)" onclick="delete_data('${
                          data._id
                        }')"><i class="fa-solid fa-trash-can"></i></button></td>
                        <td><button class="buttons-blue" href="javascript:void(0)" onclick="getting_data('${
                          data._id
                        }' , '${data.teachusername}', '${
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
    .delete(`http://localhost:3000/teachdelete/${id}`)
    .then((response) => {
      // setInterval(() => {
        window.location.reload();
      // }, 100);
    })
    .catch((err) => {
      alert(err);
    });
}

function getting_data(_id, teachusername, email ) {
  console.log(_id);
  document.getElementById(_id).innerHTML = `
  <tr id='${_id}'>
  <td>1</td>
  <td><input type='text' class='stDname' id='${_id}-stDname' value='${teachusername}' width='40'></td>
  <td><input type='text' class='email'  id='${_id}-email'value='${email}' width='40'></td>
    <td><button class="buttons" href="javascript:void(0)" onclick="delete_data('${_id}')"><i class="fa-solid fa-trash-can"></i></button></td>
  <td><button class="buttons-blue" href="javascript:void(0)" onclick="updating_data('${_id}')"><i class="fa-solid fa-pencil"></i></button></td>
  </tr>
  `;
}
        // function updating_data(id) {
        //   console.log("helll");
        //   const stDname = document.getElementById(`${id}-stDname`).value;
        //   const email = document.getElementById(`${id}-email`).value;
        //   const contactno = document.getElementById(`${id}-contactno`).value;
        //   const adress = document.getElementById(`${id}-adress`).value;
        //   console.log(stDname);
        //   console.log(email);
        //   console.log(contactno);
        //   axios
        //     .put(`http://localhost:3000/admiupdate/${id}`, {
        //       stDname: stDname,
        //       email: email,
        //       contactno: contactno,
        //       contactno: adress,
        //     })
        //     .then((reponse) => {
        //       // setInterval(() => {
        //         window.location.reload();
        //       // }, 100);
        //       // console.log(reponse);
        //     })
        //     .catch((err) => {
        //       alert(err);
        //     });
        // }

function updating_data(id) {
  const url = "http://localhost:3000";
  const Http = new XMLHttpRequest();
  Http.open("PUT", url + `/teachupdate/${id}`);
  Http.setRequestHeader("Content-Type", "application/json");
  let obj = {
     username : document.getElementById(`${id}-stDname`).value,
     email : document.getElementById(`${id}-email`).value,
  };
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      if (Http.status === 200) {
        let jsonRes = JSON.parse(Http.responseText);
        alert(jsonRes.message);
        window.location.reload()
      } else {
        let jsonRes = JSON.parse(Http.responseText);
        alert(jsonRes.message);
      }
    }
  };

  return false;
}