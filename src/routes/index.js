import { Router } from 'express';
import Controller from '../controllers';

const routes = Router();

routes.all('/generate', Controller.generate);
routes.all('/all', Controller.fetchAll);
routes.all('/sort', Controller.sort);
routes.all('/refresh', Controller.refresh);

export default routes;
