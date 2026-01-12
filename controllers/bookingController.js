const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Training = require("../models/trainingModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked training
  const training = await Training.findById(req.params.trainingId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/?training=${
      req.params.trainingId
    }&user=${req.user.id}&price=${training.price}`,
    cancel_url: `${req.protocol}://${req.get("host")}/trainings/${
      training.slug
    }`,
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
          currency: "usd",
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
exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORAR, because it's UNSECURE: everyone can book a training without paying
  const { training, user, price } = req.query;
  if (!training && !user && !price) return next();

  await Booking.create({ user, training, price });

  res.redirect(req.originalUrl.split("?")[0]);
});
