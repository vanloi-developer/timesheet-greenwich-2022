import { App } from './app';
import { accountRoute } from './core/account/routes';
import { productRoute } from './core/product/routes';

const app = new App([productRoute, accountRoute]);

app.listen();
