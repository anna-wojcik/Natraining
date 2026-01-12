import axios from "axios";
import { showAlert } from "./alerts";

export const modifyReview = async ({ id, data, type }) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/reviews/${id}`;
    const method = type === "update" ? "PATCH" : "DELETE";

    const res = await axios({
      method,
      url,
      data: type === "update" ? data : null,
    });

    // status 204 (for delete)
    if (res.data.status === "success" || res.status === 204) {
      showAlert(
        "success",
        `Review ${type === "update" ? "updated" : "deleted"} successfully!`,
        6
      );

      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
