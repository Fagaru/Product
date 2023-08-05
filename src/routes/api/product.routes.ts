import { Router } from 'express';
import * as controllers from '../../controllers/product.controllers';

const routes = Router();
// api/roles
routes.route('/all').get(controllers.all);
routes.route('/sudoCreateProduct').post(controllers.create);
routes.route('/createProduct').post(controllers.createMerchant);
routes.route('/findOne/:id').get(controllers.findOne);
routes.route('/updateOne/:id').patch(controllers.updateOne);
routes.route('/deleteAsk/:id').patch(controllers.deleteAsk);
routes.route('/deleteOne/:id').patch(controllers.deleteOne);
routes.route('/sudoDeleteOne/:id').patch(controllers.deleteOneSudo);

export default routes;