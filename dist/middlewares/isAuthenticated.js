"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = async ({ context }, next) => {
    try {
        const { req } = context;
        if (!req.headers['authorization'])
            return next(http_errors_1.default.Unauthorized());
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[2];
        await jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                throw new Error(message);
            }
            req.body = payload;
            return next();
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.isAuthenticated = isAuthenticated;
