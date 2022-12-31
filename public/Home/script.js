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
        console.log(data) 

        out = `
        <div class="carousel-item">
        <div class="classdesc">
          <div class="desc-content">
              <h1 id="headposts">${data.desc}</h1>
            <p id="paragraphpost">${data.paradesc}</p>
            <p id="date">${data.date}</p>
          </div>
          <div class="img-of-desc">
            <img src="./images/keyboard.jpg" alt="">
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
let subMenu = document.getElementById("sub")
function toggleMenu() {
  console.log("ello")
    subMenu.classList.toggle("open-wrap")
}