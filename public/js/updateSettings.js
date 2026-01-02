import axios from "axios";
import { showAlert } from "./alerts";

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "http://127.0.0.1:3000/api/v1/users/updateMyPassword"
        : "http://127.0.0.1:3000/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      document.querySelector(".passwordCurrent-error").classList.add("hidden");
      showAlert("success", `${type.toUpperCase()} updated successfully!`, 2);
      window.setTimeout(() => {
        location.assign("/me");
      }, 1000);
    }
  } catch (err) {
    document.querySelector(".passwordCurrent-error").classList.remove("hidden");
    document.querySelector(".btn--update-password").innerHTML =
      "Change Password";
    showAlert("error", err.response.data.message, 5);
  }
};
