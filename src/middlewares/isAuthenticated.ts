import { NextFunction } from 'express'
import { MiddlewareFn } from "type-graphql";
import createError from 'http-errors';
import JWT from 'jsonwebtoken';

import { Context } from "../models/Context";


export const isAuthenticated: MiddlewareFn<Context> = async ({ context }, next: NextFunction) => {

    try {
        const { req } = context;

        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[2]

        await JWT.verify(token, process.env.JWT_ACCESS_SECRET as string, (err, payload) => {
            if (err) {
                const message =
                    err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                throw new Error(message);
            }
            req.body = payload
            return next()
        })
    }
    catch (err: any) {
        throw new Error(err.message)
    }





};