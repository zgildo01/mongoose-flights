import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
  },
  price: {
    type: Number,
    min: 0,
  }
}, {
  timestamps: true
})

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
  tickets: [ticketSchema],
  meals: [{
    type: Schema.Types.ObjectId,
    ref: "Meal"
  }]
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