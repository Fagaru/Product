import { Router } from 'express';
import * as controllers from '../../controllers/file.controllers';

const routes = Router();
// api/roles
routes.route('/downloadFiles').get(controllers.downloadFiles);

export default routes;

