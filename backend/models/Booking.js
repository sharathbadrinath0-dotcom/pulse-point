const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:      { type: String },
  class:     { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  fname:     { type: String, required: true },
  lname:     { type: String, required: true },
  email:     { type: String, required: true },
  membership:{ type: String, default: 'Monthly ($89/month)' },
  status:    { 
    type: String, 
    enum: ['Confirmed', 'Pending', 'Cancelled'], 
    default: 'Confirmed' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);