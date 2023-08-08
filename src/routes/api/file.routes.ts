import { Router } from 'express';
import * as controllers from '../../controllers/file.controllers';

const routes = Router();
// api/roles
routes.route('/downloadFiles').get(controllers.downloadFiles);
routes.route('/importData').get(controllers.importData);

export default routes;

