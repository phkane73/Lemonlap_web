const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { Schema } = mongoose;
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Mật khẩu phải từ 6 ký tự"],
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
    validate: {
      validator: (value) => {
        return validator.isMobilePhone(value, "vi-VN");
      },
      message: "Số điện thoại không hợp lệ",
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'cart',
  }

});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await crypto.AES.encrypt(
      user.password,
      config.secretString.string
    ).toString();
  }
  next();
});

userSchema.methods.generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, config.JWT_KEY);
  return token;
};

userSchema.statics.login = async (phoneNumber, password) => {
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    return "error";
  }

  const bytes = await crypto.AES.decrypt(
    user.password,
    config.secretString.string
  );
  const decryptPassword = bytes.toString(crypto.enc.Utf8);
  if (decryptPassword != password) {
    return "error";
  }
  return user;
};

userSchema.statics.loginAd = async (phoneNumber, password) => {
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    return "error";
  }

  const bytes = await crypto.AES.decrypt(
    user.password,
    config.secretString.string
  );
  const decryptPassword = bytes.toString(crypto.enc.Utf8);
  if (decryptPassword != password) {
    return "error";
  }
  if (user.role == "user") {
    return "error"
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
