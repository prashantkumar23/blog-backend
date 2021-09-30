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
exports.GetTopTagsByNumberOfPostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
let GetTopTagsByNumberOfPostResponse = class GetTopTagsByNumberOfPostResponse {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GetTopTagsByNumberOfPostResponse.prototype, "tag", void 0);
GetTopTagsByNumberOfPostResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetTopTagsByNumberOfPostResponse);
let GetTopTagsByNumberOfPostResolver = class GetTopTagsByNumberOfPostResolver {
    async getTopTagsByNumberOfPost() {
        try {
            const tagCount = await Blog_1.default.aggregate([
                { $unwind: "$tags" },
                { $group: { "_id": "$tags", "count": { $sum: 1 } } },
                { $project: { _id: 0, tag: "$_id" } },
                { $sort: { "count": 1 } },
                { $limit: 10 }
            ]);
            return tagCount;
        }
        catch (error) {
            return null;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [GetTopTagsByNumberOfPostResponse]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetTopTagsByNumberOfPostResolver.prototype, "getTopTagsByNumberOfPost", null);
GetTopTagsByNumberOfPostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetTopTagsByNumberOfPostResolver);
exports.GetTopTagsByNumberOfPostResolver = GetTopTagsByNumberOfPostResolver;
