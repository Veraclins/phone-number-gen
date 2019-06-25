import { Router } from 'express';
import Controller from '../controllers';

const routes = Router();

routes.post('/generate', Controller.generate);
routes.get('/all', Controller.fetchAll);
routes.get('/sort', Controller.sort);
routes.delete('/refresh', Controller.refresh);

export default routes;
