"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoHelper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
class MongoHelper {
    initiateMongoConnection() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default
            .connect(config_1.Config.mongoUrl)
            .then(() => {
            console.log('Connected to MongoDb');
        })
            .catch((err) => {
            throw `There is error in connecting Mongo DB ${err.message}`;
        });
    }
}
exports.MongoHelper = MongoHelper;
