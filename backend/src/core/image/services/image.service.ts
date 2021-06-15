import { Types } from 'mongoose';
import { ImageCreateDTO } from '../dtos';
import { IImage } from '../interfaces/image.interface';
import { Image } from '../models';

export class ImageService {
	public async findById(id: string): Promise<IImage> {
		try {
			return await Image.findById(id);
		} catch (error) {
			throw error;
		}
	}
	public async create(image: ImageCreateDTO): Promise<IImage> {
		try {
			const newImage = new Image({
				_id: Types.ObjectId(),
				...image,
			});
			await newImage.save();
			return newImage;
		} catch (error) {
			throw error;
		}
	}
}
