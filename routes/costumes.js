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
      count: costumes.length,
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

/**
 * @route GET api/v1/costumes/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const costume = await Costume.findById(req.params.id);

    if (costume) {
      res.send({
        success: true,
        costume
      });
    }

    res.send({
      success: false,
      message: 'No costume was found with that ID'
    });
  } catch (error) {
    res.send({
      success: false,
      error
    });
  }
});

/**
 * @route PUT api/v1/costumes/:id
 * @description update a Costume with the given id
 */
router.put('/:id', async (req, res) => {
  try {
    // find the costume
    const costume = await Costume.findById(req.params.id);

    if (costume) {
      // update the costume
      Object.keys(costume.toJSON()).forEach(prop => {
        costume[prop] = req.body[prop] || costume[prop];
      });

      // save the costume
      const savedCostume = await costume.save();

      res.send({
        success: true,
        costume: savedCostume
      });
    }

    res.send({
      success: false,
      costume: 'No costume was found with that ID'
    });
  } catch (error) {
    res.send({
      success: false,
      error
    });
  }
});

/**
 * @route DELETE api/v1/costumes/:id
 * @description delete a costume with a given id
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Costume.deleteOne({ _id: req.params.id });

    res.send({
      success: true,
      deleted
    });
  } catch (error) {
    res.send({
      success: false,
      error
    });
  }
});

module.exports = router;
