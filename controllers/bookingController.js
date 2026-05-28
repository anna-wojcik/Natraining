const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Training = require("../models/trainingModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked training
  const training = await Training.findById(req.params.trainingId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://localhost:5173/`,
    cancel_url: `${req.protocol}://localhost:5173/trainings/${training.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.trainingId,
    mode: "payment",
    metadata: {
      price: training.price,
    },

    // training data
    line_items: [
      {
        price_data: {
          currency: "pln",
          unit_amount: training.price * 100,
          product_data: {
            name: `${training.name} Training`,
            description: training.description,
            images: [
              `${req.protocol}://${req.get("host")}/img/trainings/${
                training.imageCover
              }`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

// creating new booking in database
const createBookingCheckout = async (session) => {
  console.log(session);
  const training = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email }))._id;
  const price = session.metadata.price;

  await Booking.create({ user, training, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    // Constructing the event from the request body and the signature header using the Stripe library. This verifies that the event is coming from Stripe and has not been tampered with.
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
    console.log("event", event);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.getAllBookings = catchAsync(async (req, res, next) => {
  let filter = {};
  console.log("req.user.id", req.user.id);
  if (req.user.role !== "admin") {
    filter = { user: req.user.id };
  }

  const bookings = await Booking.find(filter).populate("training user");

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: {
      data: bookings,
    },
  });
});
exports.getBooking = factory.getOne(Booking);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
