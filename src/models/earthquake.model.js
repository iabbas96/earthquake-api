const mongoose = require('mongoose');

const earthquakeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  magnitude: { type: Number, required: true, min: 0, max: 10 },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  place: { type: String, required: true },
  depth: { type: Number },  // km
  time: { type: Date, required: true },
  tsunami: { type: Boolean, default: false },
  felt: { type: Number, default: 0 },
  url: { type: String }
}, { timestamps: true });

// Index for geospatial queries
earthquakeSchema.index({ location: '2dsphere' });
earthquakeSchema.index({ magnitude: -1 });
earthquakeSchema.index({ time: -1 });

module.exports = mongoose.model('Earthquake', earthquakeSchema);
