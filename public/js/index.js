import "@babel/polyfill";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { signup } from "./signup.js";

// DOM ELEMENTS
const filterForm = document.querySelector(".filters-form");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const signupForm = document.querySelector(".form--signup ");

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

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");

    let isError = false;

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!isValidField(regexEmail, email)) {
      emailError.classList.remove("hidden");
      isError = true;
    } else {
      emailError.classList.add("hidden");
    }

    if (password.length < 8) {
      passwordError.classList.remove("hidden");
      isError = true;
    } else {
      passwordError.classList.add("hidden");
    }

    if (isError) {
      return;
    }
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener("click", logout);
}

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const passwordConfirm = document
      .getElementById("passwordConfirm")
      .value.trim();

    const nameError = document.querySelector(".name-error");
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    const passwordConfirmError = document.querySelector(
      ".passwordConfirm-error"
    );

    let isError = false;
    const regexName = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name.length < 3 || name.length > 40 || !isValidField(regexName, name)) {
      nameError.classList.remove("hidden");
      isError = true;
    } else {
      nameError.classList.add("hidden");
    }
    if (!isValidField(regexEmail, email)) {
      emailError.classList.remove("hidden");
      isError = true;
    } else {
      emailError.classList.add("hidden");
    }
    if (password.length < 8) {
      passwordError.classList.remove("hidden");
      isError = true;
    } else {
      passwordError.classList.add("hidden");
    }
    if (passwordConfirm !== password) {
      passwordConfirmError.classList.remove("hidden");
      isError = true;
    } else {
      passwordConfirmError.classList.add("hidden");
    }

    console.log("dane:", name, email, password, passwordConfirm);
    if (isError) return;

    signup(name, email, password, passwordConfirm);
  });
}
