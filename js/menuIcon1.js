const menuIcon = document.querySelector("#menuIcon");
const MenuPage = document.querySelector(".MenuPages");
const menuClose = document.querySelector("#close-menu");
menuIcon.addEventListener("click",() => MenuPage.classList.add("active"));
menuClose.addEventListener("click",() => MenuPage.classList.remove("active"));