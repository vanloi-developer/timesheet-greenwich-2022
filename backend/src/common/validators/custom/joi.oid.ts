import Joi from 'joi';
import { ObjectID } from 'mongodb';
export const joiOID = Joi.extend({
	type: 'objectId',
	messages: {
		invalid: 'It must have a valid ObjectId',
	},
	validate(value, helpers) {
		const objIdPattern = /^[0-9a-fA-F]{24}$/;
		const isTest = objIdPattern.test(value);
		const isValid = ObjectID.isValid(value);
		if (!isValid || !isTest) return { value, errors: helpers.error('invalid') };
	},
});
