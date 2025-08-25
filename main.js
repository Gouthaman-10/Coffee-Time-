// ==== Navbar Toggle ====
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");
  const navMenu = document.getElementById("nav__menu");

  toggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav__link a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
});

// ==== Search Input ====
function filters() {
  let inputVal = document.getElementById("input").value.toLowerCase().trim();
  let items = document.querySelectorAll("#link__list .links");
  let list = document.getElementById("link__list");
  let hasMatch = false;

  items.forEach(item => {
    if (inputVal !== "" && item.textContent.toLowerCase().includes(inputVal)) {
      item.style.display = "block";
      hasMatch = true;
    } else {
      item.style.display = "none";
    }
  });

  // Show list only if matches exist
  list.style.display = hasMatch ? "block" : "none";
}

function LinkSearch() {
  let inputVal = document.getElementById("input").value.toLowerCase().trim();
  let items = document.querySelectorAll("#link__list .links");
  let found = false;

  items.forEach(item => {
    if (item.textContent.toLowerCase() === inputVal && inputVal !== "") {
      Click(item.textContent);
      found = true;
    }
  });

  if (!found && inputVal !== "") {
    alert("No matching link found!");
  }
}

function Click(text) {
  document.getElementById("input").value = text; // fill input with selected text
  document.getElementById("link__list").style.display = "none"; // hide suggestions
  window.location.href = './menu.html'; // redirect
}

// Hide list if input is cleared
document.getElementById("input").addEventListener("input", () => {
  if (document.getElementById("input").value.trim() === "") {
    document.getElementById("link__list").style.display = "none";
  }
});

// Hide suggestions if clicked outside
document.addEventListener("click", (e) => {
  let searchBox = document.querySelector('.search');
  if (searchBox && !searchBox.contains(e.target)) {
    document.getElementById("link__list").style.display = "none";
  }
});

// ==== Sticky Navbar ====
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header__container");
  header.classList.toggle("sticky", window.scrollY > 50);
});

// ==== Background Images ====
const images = [
  "./images/intro-1.jpg",
  "./images/intro-2.jpg",
  "./images/intro-3.jpg",
  "./images/intro-4.jpg",
  "./images/intro-5.jpg",
  "./images/intro-6.jpg"
];

const background = document.getElementById("background");
images.forEach((img, i) => {
  const div = document.createElement("div");
  div.classList.add("background-slide");
  if (i === 0) div.classList.add("active");
  div.style.backgroundImage = `url(${img})`;
  background.appendChild(div);
});

const slidesBG = document.querySelectorAll(".background-slide");
let currentBG = 0;

function changeSlide() {
  slidesBG[currentBG].classList.remove("active");
  currentBG = (currentBG + 1) % slidesBG.length;
  slidesBG[currentBG].classList.add("active");
}
setInterval(changeSlide, 5000);

// ==== Slider Section ====
const slidesContainer = document.getElementById("slides");
let sliders = slidesContainer.children;
const slideGap = 5;
let index = 1;
let slideWidth;
let containerWidth = document.querySelector(".slider__container").offsetWidth;

// Clone for seamless infinite loop
function cloneSlides() {
  const firstClone = sliders[0].cloneNode(true);
  const lastClone = sliders[sliders.length - 1].cloneNode(true);
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);
}
cloneSlides();
sliders = slidesContainer.children;

function updateWidth() {
  slideWidth = sliders[0].offsetWidth + slideGap;
  containerWidth = document.querySelector(".slider__container").offsetWidth;
  const offset = (containerWidth - slideWidth) / 2;
  slidesContainer.style.transform = `translateX(${offset - index * slideWidth}px)`;
}
window.addEventListener("resize", updateWidth);
updateWidth();

function goToSlide() {
  const offset = (containerWidth - slideWidth) / 2;
  slidesContainer.style.transition = "transform 0.6s ease-in-out";
  slidesContainer.style.transform = `translateX(${offset - index * slideWidth}px)`;
}

function nextSlide() { index++; goToSlide(); }
function prevSlide() { index--; goToSlide(); }

slidesContainer.addEventListener("transitionend", () => {
  const offset = (containerWidth - slideWidth) / 2;
  if (index === sliders.length - 1) {
    slidesContainer.style.transition = "none";
    index = 1;
    slidesContainer.style.transform = `translateX(${offset - index * slideWidth}px)`;
    void slidesContainer.offsetWidth;
    slidesContainer.style.transition = "transform 0.6s ease-in-out";
  }
  if (index === 0) {
    slidesContainer.style.transition = "none";
    index = sliders.length - 2;
    slidesContainer.style.transform = `translateX(${offset - index * slideWidth}px)`;
    void slidesContainer.offsetWidth;
    slidesContainer.style.transition = "transform 0.6s ease-in-out";
  }
});

document.getElementById("next").addEventListener("click", () => { nextSlide(); resetInterval(); });
document.getElementById("prev").addEventListener("click", () => { prevSlide(); resetInterval(); });

let autoSlide = setInterval(nextSlide, 5000);
function resetInterval() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 5000);
}

slidesContainer.addEventListener("mouseenter", () => clearInterval(autoSlide));
slidesContainer.addEventListener("mouseleave", () => autoSlide = setInterval(nextSlide, 5000));
