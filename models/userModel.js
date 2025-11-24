const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "A User must have a name"],
    minlength: [3, "A name must have more or equal than 3 characters"],
    maxlength: [40, "A name must have less or equal than 40 characters"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "PLease provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "trainer", "admin"],
    default: "user",
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    trim: true,
    minlength: [8, "Password must contain at least 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Szyfrowanie hasła przy tworzeniu użytkownika lub przy zmianie hasła
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // hash() - funkcja asynchroniczna, więc trzeba dodać await i asnyc function
  // hash the password with cost of 12
  this.password = await bcrypt(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if(!this.isModified('password') || this.isNew) return next();

  // Jeżeli hasło zostało zmodyfikowane/ustawione lub zapisano dokument, ale dokument on nie jest nowy to:
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
