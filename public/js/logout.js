import axios from "axios";
import { showAlert } from "./alerts";

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/users/logout",
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged out successfully!", 2);
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
};
