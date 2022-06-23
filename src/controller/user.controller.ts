import { Request, Response } from 'express';
import { creaUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';


export async function createUserHandle(
    req: Request<{}, {}, creaUserInput["body"]>, 
    res: Response) {
    try {
        const user = await createUser(req.body);
        return user

    } catch (error: any) {
        // 409 for conflicts
        res.status(409).send("conflict ")
    }

}