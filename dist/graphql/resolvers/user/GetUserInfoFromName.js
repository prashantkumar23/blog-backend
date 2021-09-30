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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserInfoFromNameResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../../../models/User"));
let UserInformation3 = class UserInformation3 {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInformation3.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInformation3.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInformation3.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInformation3.prototype, "bio", void 0);
UserInformation3 = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserInformation3);
let GetUserInfoFromNameResponse = class GetUserInfoFromNameResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => UserInformation3, { nullable: true }),
    __metadata("design:type", UserInformation3)
], GetUserInfoFromNameResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetUserInfoFromNameResponse.prototype, "message", void 0);
GetUserInfoFromNameResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetUserInfoFromNameResponse);
let GetUserInfoFromNameInput = class GetUserInfoFromNameInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetUserInfoFromNameInput.prototype, "name", void 0);
GetUserInfoFromNameInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetUserInfoFromNameInput);
let GetUserInfoFromNameResolver = class GetUserInfoFromNameResolver {
    async getUserInfoFromName({ name }) {
        try {
            return await User_1.default
                .findOne({ name })
                .select("id name image bio")
                .then((user) => {
                return {
                    user
                };
            });
        }
        catch (error) {
            return {
                message: error.message
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => GetUserInfoFromNameResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetUserInfoFromNameInput]),
    __metadata("design:returntype", Promise)
], GetUserInfoFromNameResolver.prototype, "getUserInfoFromName", null);
GetUserInfoFromNameResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetUserInfoFromNameResolver);
exports.GetUserInfoFromNameResolver = GetUserInfoFromNameResolver;
