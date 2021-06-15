import { IProduct } from '../interfaces';

export type ProductCreateDTO = Pick<IProduct, 'name' | 'ID' | 'category' | 'type' | 'price' | 'description'>;
