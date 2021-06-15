import { ObjectID } from 'mongodb';
import { Types } from 'mongoose';

export const ObjectId = (id?: string): Types.ObjectId => {
	try {
		if (id === undefined) return Types.ObjectId();
		return ObjectID.isValid(id) ? Types.ObjectId(id) : null;
	} catch (error) {
		throw error;
	}
};

export const ObjectIds = (_ids: string[]): Types.ObjectId[] => {
	try {
		return _ids.map((_id) => ObjectId(_id));
	} catch (error) {
		throw error;
	}
};
