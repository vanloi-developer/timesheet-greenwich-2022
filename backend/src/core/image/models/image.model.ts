import { model, Model, Schema, Types } from 'mongoose';
import { IImage } from '../interfaces/image.interface';

interface IImageModel extends Model<IImage> {}

const ImageSchema: Schema = new Schema({
	_id: Types.ObjectId,
	name: { type: String, require: true, unique: true, default: '' },
	path: { type: String, require: true, default: '' },
});

export const Image: IImageModel = model<IImage, IImageModel>('Image', ImageSchema);
