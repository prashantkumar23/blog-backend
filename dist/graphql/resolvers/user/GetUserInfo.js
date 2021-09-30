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
exports.GetUserInfoResolver = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../../../models/User"));
let UserInformation = class UserInformation {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInformation.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInformation.prototype, "bio", void 0);
UserInformation = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserInformation);
let GetUserInfoResponse = class GetUserInfoResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => UserInformation, { nullable: true }),
    __metadata("design:type", UserInformation)
], GetUserInfoResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetUserInfoResponse.prototype, "message", void 0);
GetUserInfoResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetUserInfoResponse);
let GetUserInfoInput = class GetUserInfoInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetUserInfoInput.prototype, "userId", void 0);
GetUserInfoInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetUserInfoInput);
let GetUserInfoResolver = class GetUserInfoResolver {
    async getUserInfo({ userId }) {
        try {
            return await User_1.default
                .findOne({ _id: new mongoose_1.default.Types.ObjectId(userId) })
                .select("bio")
                .then((user) => {
                const { bio } = user;
                return {
                    user: {
                        bio,
                    },
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
    (0, type_graphql_1.Query)(() => GetUserInfoResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetUserInfoInput]),
    __metadata("design:returntype", Promise)
], GetUserInfoResolver.prototype, "getUserInfo", null);
GetUserInfoResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetUserInfoResolver);
exports.GetUserInfoResolver = GetUserInfoResolver;
