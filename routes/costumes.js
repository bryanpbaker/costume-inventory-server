const express = require('express');
const router = express.Router();

// Costume Model
const Costume = require('../models/Costume');

/**
 * @route GET api/v1/costumes
 * @description GET all costumes
 */
router.get('/', async (req, res) => {
  try {
    const costumes = await Costume.find();

    res.json({
      success: true,
      costumes
    });
  } catch (error) {
    res.json({ success: false, error });
  }
});

/**
 * @route POST api/v1/costumes
 * @description create a new costume
 */
router.post('/', async (req, res) => {
  // construct new costume from request body
  const newCostume = new Costume(req.body);

  // attempt to save the new costume
  try {
    const savedCostume = await newCostume.save();

    res.send({
      success: true,
      costume: savedCostume
    });
  } catch (error) {
    res.send({
      success: false,
      error
    });
  }
});

module.exports = router;
