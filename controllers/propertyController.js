const verifyToken = require('../middlewares/verifyToken');
const Property = require('../models/Property');
const propertyController = require('express').Router();
const {
  searchAllPropertiesValidator,
} = require('../validators/propertyValidator');
const { validate } = require('express-validation');
const PropertyQueryBuilder = require('../utils/propertyBuilder');

// search with filters (add builder design pattern)
propertyController.get(
  '/find',
  validate(searchAllPropertiesValidator),
  async (req, res) => {
    const {
      type,
      area,
      bedrooms,
      bathrooms,
      parkings,
      address,
      minRent,
      maxRent,
      minPrice,
      maxPrice,
    } = req.query;
    let properties = [];
    try {
      const propertyBuilder = new PropertyQueryBuilder.Builder()
        .setType(type)
        .setBathrooms(bathrooms)
        .setBedrooms(bedrooms)
        .setParkings(parkings)
        .setAddress(address)
        .setMinRent(minRent)
        .setMaxRent(maxRent)
        .setMinPrice(minPrice)
        .setMaxPrice(maxPrice)
        .build();


        console.log('property', propertyBuilder , propertyBuilder.this);
      // properties = await Property.find({
      //   price: { $gt: minPrice, $lt: maxPrice },
      //   rent: { $gt: minRent, $lt: maxRent },
      //   address: { $regex: addresses, $options: 'i' },
      //   type: { $eq: type },
      //   parkings: { $gt: parkings },
      //   bedrooms: { $gt: bedrooms },
      //   bathrooms: { $gt: bathrooms },
      // });
      
      properties = await Property.find(propertyBuilder);

      return res.status(200).json(properties);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

// TODO FETCH INDIVIDUAL PROPERTY
propertyController.get('/find/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      throw new Error('No such property with that id');
    } else {
      return res.status(200).json(property);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// create property
propertyController.post('/', verifyToken, async (req, res) => {
  try {
    const newProperty = await Property.create({
      ...req.body,
      currentOwner: req.user.id,
    });

    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// update property
propertyController.put('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.owner !== req.user.id) {
      throw new Error('You are not allowed to update other people properties');
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedProperty);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// delete property
propertyController.put('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.owner !== req.user.id) {
      throw new Error('You are not allowed to delete other people properties');
    }

    await property.delete();

    return res.status(200).json({ msg: 'Successfully deleted property' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// // get featured
// propertyController.get('/find/featured', async (req, res) => {
//   try {
//     const featuredProperties = await Property.find({ featured: true }).populate(
//       'currentOwner',
//       '-password'
//     );
//     return res.status(200).json(featuredProperties);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// propertyController.get('/find/types', async (req, res) => {
//   try {
//     const houseType = await Property.countDocuments({ type: 'house' });
//     const apartmentType = await Property.countDocuments({ type: 'apartment' });

//     return res.status(200).json({ house: houseType, apartment: apartmentType });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

module.exports = propertyController;
