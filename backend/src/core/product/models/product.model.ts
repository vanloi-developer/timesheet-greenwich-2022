import { Model, model, Schema, Types } from 'mongoose';
import { schemaOption } from '../../base/constants';
import { IProduct, ProductCategory, ProductType } from '../interfaces';

interface IProductModel extends Model<IProduct> {}
const ProductSchema: Schema = new Schema(
	{
		_id: Types.ObjectId,
		name: { type: String, require: true, default: '' },
		ID: { type: String, require: true, default: '', unique: true },
		type: { type: String, enum: Object.values(ProductType), default: ProductType.A }, //FIXME:
		category: { type: String, enum: Object.values(ProductCategory), default: ProductCategory.A1 }, //FIXME:
		price: { type: Number, require: true, default: 0 },
		description: { type: String, require: true, default: '' },
		thumbnailId: { type: Types.ObjectId, ref: 'Image' },
		images: { type: [Types.ObjectId], ref: 'Image' },
		createdBy: { type: Types.ObjectId, ref: 'Account', default: null },
		updatedBy: { type: Types.ObjectId, ref: 'Account', default: null },
	},
	schemaOption
);

export const Product: IProductModel = model<IProduct, IProductModel>('Product', ProductSchema);
