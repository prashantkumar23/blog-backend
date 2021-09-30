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
exports.GetTopBlogsByTopicResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
let UserAssociated = class UserAssociated {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserAssociated.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserAssociated.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserAssociated.prototype, "image", void 0);
UserAssociated = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserAssociated);
let TopBlogs = class TopBlogs {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TopBlogs.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TopBlogs.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TopBlogs.prototype, "blogImageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], TopBlogs.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], TopBlogs.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserAssociated),
    __metadata("design:type", UserAssociated)
], TopBlogs.prototype, "user", void 0);
TopBlogs = __decorate([
    (0, type_graphql_1.ObjectType)()
], TopBlogs);
let GetTopBlogsByTopicResponse = class GetTopBlogsByTopicResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [TopBlogs], { nullable: true }),
    __metadata("design:type", Array)
], GetTopBlogsByTopicResponse.prototype, "blogs", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetTopBlogsByTopicResponse.prototype, "message", void 0);
GetTopBlogsByTopicResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetTopBlogsByTopicResponse);
let GetTopBlogsByTopicInput = class GetTopBlogsByTopicInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetTopBlogsByTopicInput.prototype, "topic", void 0);
GetTopBlogsByTopicInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetTopBlogsByTopicInput);
let GetTopBlogsByTopicResolver = class GetTopBlogsByTopicResolver {
    async getTopBlogsByTopicResolver({ topic }) {
        try {
            const b = await Blog_1.default.find({ tags: topic })
                .sort({ createdAt: -1 })
                .select('_id title createdAt blogImageUrl tags')
                .limit(5)
                .populate({
                path: 'user',
                model: 'User',
                select: '_id name image',
            });
            return {
                blogs: b
            };
        }
        catch (error) {
            return { blogs: undefined, message: 'Not Found' };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => GetTopBlogsByTopicResponse),
    __param(0, (0, type_graphql_1.Arg)('getTopBlogsByTopicInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetTopBlogsByTopicInput]),
    __metadata("design:returntype", Promise)
], GetTopBlogsByTopicResolver.prototype, "getTopBlogsByTopicResolver", null);
GetTopBlogsByTopicResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetTopBlogsByTopicResolver);
exports.GetTopBlogsByTopicResolver = GetTopBlogsByTopicResolver;
