import { Router } from 'express';
import productsRoutes from './api/product.routes';
const routes = Router();

routes.use('/products', productsRoutes);

export default routes;