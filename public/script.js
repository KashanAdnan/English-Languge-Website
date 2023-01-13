const url = "http://localhost:3000";

function getData() {
  var showdata = document.getElementById("showdata");
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/descdata");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      console.log(jsonRes);
      let out;
      jsonRes.map((data) => {
        console.log(data);

        out = `
        <div class="carousel-item">
        <div class="box">
        <div class="square">
        <div class="borders">
        <div class=x"logo">
        
        </div>
        <div class="border-radiuse-2">
        <div class="blue-top"></div>
        <div class="white-top"></div>
        </div>
        <div class="content-of-description">
            <i class="fa-solid fa-quote-left"></i>
            <h1 style='width : 600px'><q id="heading">${data.desc}</q></h1>
            <p>${data.paradesc}</p>
            <h3>2023-01-01T14:45</h3>
            </div>
            <div class="border-radiuse-2">
            <div class="blue"></div>
            <div class="white"></div>
            </div>
            </div>
            </div>
            </div>
            </div>
            `;
        showdata.innerHTML += out;
      });
    }
  };
  console.log("hello");
}

getData();
let subMenu = document.getElementById("sub");
function toggleMenu() {
  console.log("ello");
  subMenu.classList.toggle("open-wrap");
}
let menu = document.getElementById("menu");
function toggleinMenu() {
  console.log("ello");
  menu.classList.toggle("open-menu");
}

function logout() {
  const Http = new XMLHttpRequest();
  Http.open("POST", url + "/logout");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      console.log(jsonRes);
    }
  };
}

