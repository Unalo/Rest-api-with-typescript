// validate request against schema 
// eg when creating a user (email, password) validate if both are present and are strings
// validate email

import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from 'zod';

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    // creating schema, validating (Strings) body,query and params of the request
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
    } catch (e: any) {
        // catching the error
        return res.status(400).send(e.errors);
    }
}

export default validate; 