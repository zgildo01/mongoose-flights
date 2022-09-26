import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flightSchema = new Schema({
  airline: {
    type: String,
    default: "Cainline",
  },
  airport: {
    type: String,
    default: "Cainport",
  },
  flightNo: {
    type: Number,
    default: 25
  },
  departs: {
    type: Date,
    default: oneYearFromNow,
  },
}, {
  timestamps: true
})
function oneYearFromNow() {
  const today = new Date();
  today.setFullYear(today.getFullYear()+1)
  return today
}

const Flight = mongoose.model('Flight', flightSchema);

export {
  Flight
}