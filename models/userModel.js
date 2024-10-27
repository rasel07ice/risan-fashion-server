const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true, // Unique Firebase UID for each user
    },
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
      required: [true, "please enter contact email"],
    },
    password: {
      type: String,
      required: [true, "please enter password"],
    },
    role: {
      type: String,
      default: "user",
    },
    photoUrl: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: [true, "please enter contact phone"],
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    methods: {
      findByEmail: function (emailParam) {
        return mongoose.model("User").find({ email: emailParam });
      },
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set creation time
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
