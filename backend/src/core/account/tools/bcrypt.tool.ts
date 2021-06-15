import bcrypt from 'bcrypt';
import { config } from '../../../common/config';

export const hashPassword = (password: string): string => {
	return bcrypt.hashSync(password, config.salt);
};

export const comparePassword = (password: string, hash: string): boolean => {
	return bcrypt.compareSync(password, hash);
};
