"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient({
    port: parseInt(process.env.redis_port),
    host: process.env.redis_host,
    password: process.env.redis_password,
});
client.on('connect', () => {
    console.log('Client connected to redis...');
});
client.on('ready', () => {
    console.log('Client connected to redis and ready to use...');
});
client.on('error', (err) => {
    console.log(err.message);
});
client.on('end', () => {
    console.log('Client disconnected from redis');
});
process.on('SIGINT', () => {
    client.quit();
});
exports.default = client;
