import "@babel/polyfill";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { signup } from "./signup.js";
import { regexName, regexEmail } from "./regex.js";
import { updateSettings } from "./updateSettings.js";
import { modifyReview } from "./modifyReviews.js";
import { bookTraining } from "./stripe.js";

// DOM ELEMENTS
const filterForm = document.querySelector(".filters-form");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const signupForm = document.querySelector(".form--signup ");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const reviewCards = document.querySelectorAll(".review-card");
const bookButton = document.getElementById("book-training");

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

    if (isError) return;

    signup(name, email, password, passwordConfirm);
  });
}

if (userDataForm) {
  userDataForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const photo = document.getElementById("photo").files[0];

    const nameError = document.querySelector(".name-error");
    const emailError = document.querySelector(".email-error");
    const photoError = document.querySelector(".photo-error");

    let isError = false;

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

    if (photo && !photo.type.startsWith("image/")) {
      photoError.classList.remove("hidden");
      isError = true;
    } else {
      photoError.classList.add("hidden");
    }

    if (isError) return;
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("photo", photo);

    updateSettings(form, "data");
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const passwordCurrent = document
      .getElementById("passwordCurrent")
      .value.trim();
    const password = document.getElementById("password").value.trim();
    const passwordConfirm = document
      .getElementById("passwordConfirm")
      .value.trim();

    const passwordError = document.querySelector(".password-error");
    const passwordConfirmError = document.querySelector(
      ".passwordConfirm-error"
    );

    let isError = false;

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

    if (isError) return;

    const updatePasswordBtn = (document.querySelector(
      ".btn--update-password"
    ).innerHTML = "Updating...");

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );
    updatePasswordBtn.innerHTML = "Change Password";
    document.getElementById("passwordCurrent").value = "";
    document.getElementById("password").value = "";
    document.getElementById("passwordConfirm").value = "";
  });
}

if (reviewCards.length > 0) {
  reviewCards.forEach((reviewCard) => {
    // Review Id got from data atribute (added in PUG)
    const reviewId = reviewCard.dataset.reviewId;

    const btnEdit = reviewCard.querySelector(".review-card__button--edit");
    const form = reviewCard.querySelector(".review-edit-form");
    const reviewDescription = reviewCard.querySelector(".review-description");

    const btnCancel = reviewCard.querySelector(".btn-cancel");
    const btnUpdate = reviewCard.querySelector(".btn-update");
    const btnDelete = reviewCard.querySelector(".btn-delete");
    const reviewTextField = reviewCard.querySelector(".review-input-text");
    const reviewRatingField = reviewCard.querySelector(".review-input-rating");

    if (btnEdit) {
      btnEdit.addEventListener("click", () => {
        reviewDescription.classList.add("hidden");
        form.classList.remove("hidden");
        btnCancel.classList.remove("hidden");
        btnEdit.classList.add("hidden");

        const tempReviewRating = reviewRatingField.value;

        btnCancel.addEventListener("click", (event) => {
          event.preventDefault(); // prevent refreshing the website
          form.classList.add("hidden");
          reviewDescription.classList.remove("hidden");
          btnCancel.classList.add("hidden");
          btnEdit.classList.remove("hidden");

          reviewTextField.value = reviewDescription.textContent;
          reviewRatingField.value = tempReviewRating;
        });

        // updating review
        btnUpdate.addEventListener("click", (event) => {
          event.preventDefault();

          const reviewText = reviewTextField.value.trim();
          const reviewRating = reviewRatingField.value;
          if (reviewText !== "") {
            modifyReview({
              id: reviewId,
              data: { review: reviewText, rating: reviewRating },
              type: "update",
            });
          }
        });

        btnDelete.addEventListener("click", (event) => {
          event.preventDefault();
          modifyReview({ id: reviewId, type: "delete" });
        });
      });
    }
  });
}

if (bookButton) {
  bookButton.addEventListener("click", () => {
    bookButton.textContent = "Processing...";
    const trainingId = bookButton.dataset.trainingId;

    bookTraining(trainingId);
  });
}

