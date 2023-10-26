var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: true
});

axios.get("http://localhost:3000/me").then((res) => {
  window.location.href = "../Home/home.html"
}).catch((err) => {
  console.log(err);
})