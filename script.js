const interval=setInterval(myClock,1000);
function myClock(){
    const date=new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeShow = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    document.getElementById("clock").innerHTML= timeShow;}

const hamburger = document.querySelector(".hamburger");
const navUL = document.querySelector("#navUL");

hamburger.addEventListener("click", function() {
navUL.classList.toggle("show");
});

const birthYear = 1984;
const date = new Date();
let currentYear = date.getFullYear();
let myAge = currentYear - birthYear;
let age = document.getElementById("age");
age.innerText = `${myAge} years old`








