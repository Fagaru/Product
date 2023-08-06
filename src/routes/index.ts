import { Router } from 'express';
import productsRoutes from './api/product.routes';
import filesRoutes from './api/file.routes'
const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/files', filesRoutes);

export default routes;