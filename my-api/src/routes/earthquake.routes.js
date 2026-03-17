const express = require('express');
const router = express.Router();
const {
  getAll, getOne, create, update, destroy, seedFromUSGS
} = require('../controllers/earthquake.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');
const { cache } = require('../middleware/cache.middleware');

/**
 * @swagger
 * tags:
 *   name: Earthquakes
 *   description: Earthquake data management
 */

/**
 * @swagger
 * /api/earthquakes:
 *   get:
 *     summary: Get all earthquakes (public, paginated, cached)
 *     tags: [Earthquakes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20, maximum: 20 }
 *       - in: query
 *         name: minMag
 *         schema: { type: number }
 *         description: Filter by minimum magnitude
 *       - in: query
 *         name: maxMag
 *         schema: { type: number }
 *       - in: query
 *         name: place
 *         schema: { type: string }
 *         description: Filter by place name (partial match)
 *       - in: query
 *         name: tsunami
 *         schema: { type: boolean }
 *     responses:
 *       200:
 *         description: Paginated list of earthquakes
 */
router.get('/', cache('earthquakes'), getAll);

/**
 * @swagger
 * /api/earthquakes/{id}:
 *   get:
 *     summary: Get a single earthquake by ID (public)
 *     tags: [Earthquakes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Earthquake data
 *       404:
 *         description: Not found
 */
router.get('/:id', getOne);

/**
 * @swagger
 * /api/earthquakes:
 *   post:
 *     summary: Create a new earthquake entry (admin only)
 *     tags: [Earthquakes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, magnitude, place, time, location]
 *             properties:
 *               title: { type: string }
 *               magnitude: { type: number }
 *               place: { type: string }
 *               time: { type: string, format: date-time }
 *               depth: { type: number }
 *               tsunami: { type: boolean }
 *               location:
 *                 type: object
 *                 properties:
 *                   type: { type: string, example: Point }
 *                   coordinates: { type: array, items: { type: number } }
 *     responses:
 *       201:
 *         description: Earthquake created
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, adminOnly, create);

/**
 * @swagger
 * /api/earthquakes/{id}:
 *   put:
 *     summary: Update an earthquake entry (admin only)
 *     tags: [Earthquakes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Updated earthquake
 *       404:
 *         description: Not found
 */
router.put('/:id', protect, adminOnly, update);

/**
 * @swagger
 * /api/earthquakes/{id}:
 *   delete:
 *     summary: Delete an earthquake entry (admin only)
 *     tags: [Earthquakes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.delete('/:id', protect, adminOnly, destroy);

/**
 * @swagger
 * /api/earthquakes/seed:
 *   post:
 *     summary: Seed 1000+ earthquakes from USGS (admin only)
 *     tags: [Earthquakes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Seeded successfully
 */
router.post('/seed', protect, adminOnly, seedFromUSGS);

module.exports = router;
