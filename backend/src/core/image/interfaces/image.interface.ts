import { Document } from 'mongoose';
import { IBase } from '../../base/interfaces';

export interface IImage extends IBase, Document {
	name: string;
	path: string;
}
