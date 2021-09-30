"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListOfUsersResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../../../models/User"));
let ListOfUsers = class ListOfUsers {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ListOfUsers.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ListOfUsers.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ListOfUsers.prototype, "image", void 0);
ListOfUsers = __decorate([
    (0, type_graphql_1.ObjectType)()
], ListOfUsers);
let GetListOfUsersResponse = class GetListOfUsersResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [ListOfUsers], { nullable: true }),
    __metadata("design:type", Array)
], GetListOfUsersResponse.prototype, "users", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetListOfUsersResponse.prototype, "message", void 0);
GetListOfUsersResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetListOfUsersResponse);
let GetListOfUsersResolver = class GetListOfUsersResolver {
    async getListOfUsers() {
        try {
            const users = await User_1.default
                .find()
                .select("id name image")
                .limit(5);
            return {
                users
            };
        }
        catch (error) {
            return {
                message: error.message
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => GetListOfUsersResponse, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetListOfUsersResolver.prototype, "getListOfUsers", null);
GetListOfUsersResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetListOfUsersResolver);
exports.GetListOfUsersResolver = GetListOfUsersResolver;
