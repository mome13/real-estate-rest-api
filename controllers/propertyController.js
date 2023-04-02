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

// get all from type
propertyController.get('/find', async (req, res) => {
  const type = req.query;
  let properties = [];
  try {
    if (type) {
      properties = await Property.find(type).populate('owner', '-password');
    } else {
      properties = await Property.find({});
    }

    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error);
  }
});

propertyController.get('/find/types', async (req, res) => {
  try {
    const houseType = await Property.countDocuments({ type: 'house' });
    const apartmentType = await Property.countDocuments({ type: 'apartment' });

    return res.status(200).json({ house: houseType, apartment: apartmentType });
  } catch (error) {
    return res.status(500).json(error);
  }
});
