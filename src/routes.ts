import { Express, Request, Response } from 'express';
import { createUserHandle } from './controller/user.controller';
import validateResource from './middleware/validateResource'
import { createUserSchema } from './schema/user.schema';

const routes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    app.post('/api/user',validateResource(createUserSchema),  createUserHandle)
}
export default routes;