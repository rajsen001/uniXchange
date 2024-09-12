const mongoose = require("mongoose");
const { isEmail, contains } = require("validator");
const filter = require("../util/filter");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "Must be at least 6 characters long"],
      maxlength: [30, "Must be no more than 30 characters long"],
      validate: {
        validator: (val) => !contains(val, " "),
        message: "Must contain no spaces",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Must be valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Must be at least 8 characters long"],
    },
    biography: {
      type: String,
      default: "",
      maxLength: [250, "Must be at most 250 characters long"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailConfirmationToken: {
      type: String,
      default: "",
    },
    college: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (filter.isProfane(this.username)) {
    throw new Error("Username cannot contain profanity");
  }

  if (this.biography.length > 0) {
    this.biography = filter.clean(this.biography);
  }

  next();
});

UserSchema.methods.createToken = async function (str) {
  // This function is creating a random 64 characters string
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  if (str === "passwordReset") {
    // This is used to hash the string
    this.passwordResetToken = hashedToken;
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    // Means 1000 * 60 means,, 60 sec i,e 1 min and * 10 means 10 min
    // So the token will expire in 10 minutes
  } else if (str === "emailConfirmation") {
    this.emailConfirmationToken = hashedToken;
  }
  return token;
};

module.exports = mongoose.model("user", UserSchema);
