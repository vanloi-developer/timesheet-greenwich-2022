import { format } from 'winston';
const { combine, timestamp, printf } = format;

export const winstonFormat = combine(
	timestamp({
		format: 'YYYY-MM-DD HH:mm:ss',
	}),
	printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
);
