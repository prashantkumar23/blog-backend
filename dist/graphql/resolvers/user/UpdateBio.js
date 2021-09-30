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
exports.UpdateBioResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../../../models/User"));
let UpdateBioResponse = class UpdateBioResponse {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateBioResponse.prototype, "bio", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateBioResponse.prototype, "message", void 0);
UpdateBioResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UpdateBioResponse);
let UpdateBioInput = class UpdateBioInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateBioInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateBioInput.prototype, "bio", void 0);
UpdateBioInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateBioInput);
let UpdateBioResolver = class UpdateBioResolver {
    async updateBio({ userId, bio }) {
        try {
            return await User_1.default
                .findOneAndUpdate({ _id: userId }, {
                bio
            }, {
                new: true
            })
                .select('bio')
                .then((newUser) => {
                return {
                    bio: newUser.bio,
                    message: "Bio updated!"
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
    (0, type_graphql_1.Mutation)(() => UpdateBioResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('updateBioInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateBioInput]),
    __metadata("design:returntype", Promise)
], UpdateBioResolver.prototype, "updateBio", null);
UpdateBioResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UpdateBioResolver);
exports.UpdateBioResolver = UpdateBioResolver;
