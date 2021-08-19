import { randomBytes } from 'crypto';

const salt = randomBytes(8).toString('hex');

export = salt;
