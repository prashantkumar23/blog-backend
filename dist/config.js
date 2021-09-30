"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
}
exports.Config = Config;
Config.mongoUrl = `mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@${process.env.mongo_host_name}/${process.env.mongo_db_name}?retryWrites=true&w=majority`;
