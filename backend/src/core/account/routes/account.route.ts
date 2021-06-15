import { Router } from 'express';
import { IRoute } from '../../../common/interfaces';
import { upload, uploadOne } from '../../../common/upload';
import { accountController } from '../controllers';
import { authMiddleware } from '../middlewares';

export class AccountRoute implements IRoute {
	public path = '/account';
	public routes = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.routes.post('/', accountController.create);
		this.routes.post('/signin', accountController.singIn);
		this.routes.patch('/password', authMiddleware, accountController.changePassword);
		this.routes.patch('/', authMiddleware, accountController.editAccount);
		this.routes.get('/', authMiddleware, accountController.getProfile);
		this.routes.get('/avatar', authMiddleware, accountController.getAvatar);
		this.routes.get('/all', authMiddleware, accountController.getAll);
	}
}
