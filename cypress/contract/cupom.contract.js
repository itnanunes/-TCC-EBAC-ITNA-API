
const Joi = require('joi');

const couponSchema = Joi.object({
  code: Joi.string().required(),
  amount: Joi.string().required(),
  discount_type: Joi.string().valid('fixed_product').required(),
  description: Joi.string().required()
});

export default couponSchema;
