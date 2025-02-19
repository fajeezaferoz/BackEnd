const mongoose = require('mongoose');
const customer = require('./customer.model');

const paymentSchema = new mongoose.Schema({
  payId: { 
    type: String,
    unique: true,
    default: function () {
      return `${this.customerId}-${Date.now()}`;
    } 
  },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  department: { type: String, required: true},
  customerId: { type: String, ref: customer, required: true }
}, { timestamps: true});
 
paymentSchema.pre('save', function (next) {
  if (!this.payId) {
      this.payId = `${this.customerId}-${Date.now()}`;
  }
  next();
});


const Payment = mongoose.model("payment", paymentSchema, "payment");
module.exports = Payment;
