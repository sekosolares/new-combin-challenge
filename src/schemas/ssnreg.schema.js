const Joi = require('joi');

const firstNameSchema = Joi.string().min(1).required().trim();
const lastNameSchema = Joi.string().min(1).required().trim();
const addressSchema = Joi.string().min(1).required().trim();
const ssnSchema = Joi.string().required().trim().pattern(/^(\d{3})+(-\d{2})+(-\d{4})$/);

const SSNSchema = Joi.object({
      firstName: firstNameSchema,
      lastName: lastNameSchema,
      address: addressSchema,
      ssn: ssnSchema
});

module.exports = { SSNSchema, firstNameSchema, lastNameSchema, addressSchema, ssnSchema };