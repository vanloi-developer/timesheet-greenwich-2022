import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { IMongoConfig } from './interfaces';
import { config } from '../config';
import { mongoSetup } from './mongo.const';
import { logger } from '../logger';

export class MongoConfig {
	constructor(private readonly uri: string, private readonly config: IMongoConfig) {}

	public async connect() {
		try {
			if (config.isDebug) {
				const mongo = new MongoMemoryServer();
				const testUri = await mongo.getUri();
				await mongoose.connect(testUri, this.config);
				return logger.info('Connected to Test DB');
			}
			await mongoose.connect(this.uri, this.config);
			return logger.info(`Connected to DB ${this.uri}`);
		} catch (error) {
			logger.error(error.message);
			throw new Error(error);
		}
	}
}

const uri = config.get('mongo_uri');
export const mongoConfig = new MongoConfig(uri, mongoSetup);
