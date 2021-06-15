import { ProductCategory, ProductType } from '../interfaces';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../../common/exception/http-error';
import { productService } from '../services';
import { ProductCreateDTO } from '../dtos';
import { RequestWithUser } from '../../base/interfaces';
import { uploadMany, uploadOne } from '../../../common/upload';
import { IImage } from '../../image/interfaces/image.interface';
import { imageService } from '../../image/services';

export class ProductController {
	public async create(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			await uploadOne(req, res);
			let image: IImage;
			if (req.file) {
				image = await imageService.create({ name: req.file.filename, path: req.file.path });
			}
			const product: ProductCreateDTO = req.body;
			const newProduct = await productService.create(product, req.user._id, image ? image._id : undefined);
			return res.status(200).send({ newProduct });
		} catch (error) {
			next(error);
		}
	}
	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const products = await productService.findAll();
			return res.status(200).send({ products });
		} catch (error) {
			next(error);
		}
	}
	public async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const product = await productService.findById(id);
			return res.status(200).send({ product });
		} catch (error) {
			next(error);
		}
	}
	public async findByType(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.params;
			if (!Object.values(ProductType).includes(type)) throw new HttpException(400, 'Type wrong!');
			const products = await productService.findByType(ProductType[type]);
			return res.status(200).send({ products });
		} catch (error) {
			next(error);
		}
	}
	public async findByCategory(req: Request, res: Response, next: NextFunction) {
		try {
			const { category } = req.params;
			if (!Object.values(ProductCategory).includes(category)) throw new HttpException(400, 'Category wrong!');
			const product = await productService.findByCategory(category);
			return res.status(200).send({ product });
		} catch (error) {
			next(error);
		}
	}
	public async addImage(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			await uploadMany(req, res);
			return res.status(200).send(req.files);
		} catch (error) {
			next(error);
		}
	}
}
