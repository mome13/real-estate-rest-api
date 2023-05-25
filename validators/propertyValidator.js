const { Joi } = require('express-validation');

const searchAllPropertiesValidator = {
  query: Joi.object({
    type: Joi.string().valid('rent', 'sale'),
    address: Joi.string(),
    area: Joi.number().min(0),
    bedrooms: Joi.number().integer().min(0),
    bathrooms: Joi.number().integer().min(0),
    parkings: Joi.number().integer().min(0),
    minRent: Joi.number().min(0),
    maxRent: Joi.number().min(1),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().min(1),
  }),
};

module.exports = {
  searchAllPropertiesValidator,
};
