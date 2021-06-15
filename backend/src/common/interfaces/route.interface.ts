import { Router } from 'express';

export interface IRoute {
	path?: string;
	routes: Router;
}
