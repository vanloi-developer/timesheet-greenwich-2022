import { IProduct } from '../interfaces';

export type ProductUpdateDTO = Pick<IProduct, 'name' | 'ID' | 'category' | 'type' | 'price' | 'description'>;
