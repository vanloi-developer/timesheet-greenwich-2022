import { IImage } from '../interfaces/image.interface';

export type ImageCreateDTO = Pick<IImage, 'name' | 'path'>;
