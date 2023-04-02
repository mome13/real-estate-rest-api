const Property = require('../models/Property');
const propertyController = require('express').Router();

// get all
propertyController.get('/getAll', async (req, res) => {
  try {
    const properties = await Property.find({});
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
  }
});
