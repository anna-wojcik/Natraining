import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51SojfgRpISHUndbu3IchrdVO34uijQoejQSaaMuycRxM2GDWIbAni165sURaYaV2aYo2haOJmV9mw3wW4HqjkgeP004m5BOpNh"
);

export const bookTraining = async (trainingId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios({
      method: "GET",
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${trainingId}`,
    });
    
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }
};