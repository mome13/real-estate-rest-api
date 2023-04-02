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

// get featured
propertyController.get('/find/featured', async (req, res) => {
  try {
    const featuredProperties = await Property.find({ featured: true }).populate(
      'currentOwner',
      '-password'
    );
    return res.status(200).json(featuredProperties);
  } catch (error) {
    return res.status(500).json(error);
  }
});
