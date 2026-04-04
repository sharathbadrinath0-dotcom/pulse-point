const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  instructor:  { type: String, required: true },
  date:        { type: Date, required: true },
  startTime:   { type: String, required: true },
  endTime:     { type: String, required: true },
  capacity:    { type: Number, required: true, min: 1 },
  type:        { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);