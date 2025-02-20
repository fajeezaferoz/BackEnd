const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: true,
  },
  otp: { 
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// TTL Index to auto-delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model("otp", otpSchema, "otp");

module.exports = OTP;
