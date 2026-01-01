import "@babel/polyfill";
import { login } from "./login.js";

// DOM ELEMENTS
const filterForm = document.querySelector(".filters-form");
const loginForm = document.querySelector(".form--login");

if (filterForm) {
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const trainingType = document.getElementById("trainingType").value;
    const level = document.getElementById("level").value;
    const price = document.getElementById("price").value;
    const name = document.getElementById("name").value;

    const url = new URL("/", window.location.origin);

    if (trainingType !== "all")
      url.searchParams.append("trainingType", trainingType);
    if (level !== "all") url.searchParams.append("level", level);
    if (name) url.searchParams.append("name", name);

    if (price !== "all") {
      const parts = price.split(",");

      parts.forEach((part) => {
        const [operator, value] = part.split("=");
        url.searchParams.append(`price${operator}`, value);
      });
    }

    window.location.href = url.toString();
  });
}

const isValidField = (regex, field) => {
  return regex.test(field);
};

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");

    let isError = false;

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!isValidField(regexEmail, email)) {
      emailError.classList.remove("hidden");
      isError = true;
    }
    if (password.length < 8) {
      passwordError.classList.remove("hidden");
      isError = true;
    }
    if (isError) {
      return;
    }
    login(email, password);
  });
}
