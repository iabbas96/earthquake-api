const Earthquake = require('../models/earthquake.model');
const { clearCache } = require('../middleware/cache.middleware');

// @GET /api/earthquakes — PUBLIC with pagination
const getAll = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(20, parseInt(req.query.limit) || 20); // max 20 per page
    const skip = (page - 1) * limit;

    // Filters
    const filter = {};
    if (req.query.minMag) filter.magnitude = { $gte: parseFloat(req.query.minMag) };
    if (req.query.maxMag) filter.magnitude = { ...filter.magnitude, $lte: parseFloat(req.query.maxMag) };
    if (req.query.place) filter.place = { $regex: req.query.place, $options: 'i' };
    if (req.query.tsunami) filter.tsunami = req.query.tsunami === 'true';

    const [earthquakes, total] = await Promise.all([
      Earthquake.find(filter).sort({ time: -1 }).skip(skip).limit(limit),
      Earthquake.countDocuments(filter)
    ]);

    res.json({
      data: earthquakes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @GET /api/earthquakes/:id — PUBLIC
const getOne = async (req, res) => {
  try {
    const earthquake = await Earthquake.findById(req.params.id);
    if (!earthquake) return res.status(404).json({ error: 'Earthquake not found' });
    res.json({ data: earthquake });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @POST /api/earthquakes — PROTECTED (admin)
const create = async (req, res) => {
  try {
    const earthquake = await Earthquake.create(req.body);
    await clearCache('earthquakes');
    res.status(201).json({ message: 'Earthquake created', data: earthquake });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @PUT /api/earthquakes/:id — PROTECTED (admin)
const update = async (req, res) => {
  try {
    const earthquake = await Earthquake.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!earthquake) return res.status(404).json({ error: 'Earthquake not found' });
    await clearCache('earthquakes');
    res.json({ message: 'Earthquake updated', data: earthquake });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @DELETE /api/earthquakes/:id — PROTECTED (admin)
const destroy = async (req, res) => {
  try {
    const earthquake = await Earthquake.findByIdAndDelete(req.params.id);
    if (!earthquake) return res.status(404).json({ error: 'Earthquake not found' });
    await clearCache('earthquakes');
    res.json({ message: 'Earthquake deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @POST /api/earthquakes/seed — PROTECTED (admin) — seed from USGS
const seedFromUSGS = async (req, res) => {
  try {
    const axios = require('axios');
    const response = await axios.get(
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=1000&minmagnitude=2.5&orderby=time'
    );

    const features = response.data.features;
    const earthquakes = features.map(f => ({
      title: f.properties.title,
      magnitude: f.properties.mag,
      place: f.properties.place,
      time: new Date(f.properties.time),
      tsunami: f.properties.tsunami === 1,
      felt: f.properties.felt || 0,
      url: f.properties.url,
      depth: f.geometry.coordinates[2],
      location: {
        type: 'Point',
        coordinates: [f.geometry.coordinates[0], f.geometry.coordinates[1]]
      }
    }));

    await Earthquake.deleteMany({});
    await Earthquake.insertMany(earthquakes);
    await clearCache('earthquakes');

    res.json({ message: `✅ Seeded ${earthquakes.length} earthquakes from USGS` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getOne, create, update, destroy, seedFromUSGS };
