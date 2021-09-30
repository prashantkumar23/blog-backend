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
exports.GetBlogsByTagResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
let GetBlogsByTagInput = class GetBlogsByTagInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetBlogsByTagInput.prototype, "tag", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetBlogsByTagInput.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetBlogsByTagInput.prototype, "nPerPage", void 0);
GetBlogsByTagInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetBlogsByTagInput);
let UserInfoTwo = class UserInfoTwo {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInfoTwo.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInfoTwo.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInfoTwo.prototype, "image", void 0);
UserInfoTwo = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserInfoTwo);
let BlogByTag = class BlogByTag {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BlogByTag.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BlogByTag.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BlogByTag.prototype, "blogImageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], BlogByTag.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], BlogByTag.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserInfoTwo, { nullable: true }),
    __metadata("design:type", UserInfoTwo)
], BlogByTag.prototype, "user", void 0);
BlogByTag = __decorate([
    (0, type_graphql_1.ObjectType)()
], BlogByTag);
let NextTopicParams = class NextTopicParams {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextTopicParams.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextTopicParams.prototype, "nPerPage", void 0);
NextTopicParams = __decorate([
    (0, type_graphql_1.ObjectType)()
], NextTopicParams);
let GetBlogsByTagResponse = class GetBlogsByTagResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetBlogsByTagResponse.prototype, "count", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => NextTopicParams, { nullable: true }),
    __metadata("design:type", NextTopicParams)
], GetBlogsByTagResponse.prototype, "next", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GetBlogsByTagResponse.prototype, "prevoius", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [BlogByTag], { nullable: true }),
    __metadata("design:type", Array)
], GetBlogsByTagResponse.prototype, "blogs", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetBlogsByTagResponse.prototype, "message", void 0);
GetBlogsByTagResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetBlogsByTagResponse);
let GetBlogsByTagResolver = class GetBlogsByTagResolver {
    async getBlogsByTag({ tag, pageNumber, nPerPage }) {
        try {
            let count;
            await Blog_1.default.find({ tags: tag }).count().then((c) => count = c);
            const blogsByTopic = await Blog_1.default
                .find({ tags: tag })
                .sort({ createdAt: -1 })
                .select('_id title createdAt tags blogImageUrl')
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage)
                .populate({
                path: 'user',
                model: 'User',
                select: '-password -createdAt -updatedAt -__v'
            });
            if (blogsByTopic.length === 0) {
                return {
                    count,
                    next: undefined,
                    prevoius: '',
                    blogs: undefined
                };
            }
            return {
                count,
                next: {
                    pageNumber: pageNumber + 1,
                    nPerPage
                },
                prevoius: '',
                blogs: blogsByTopic
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
    (0, type_graphql_1.Query)(() => GetBlogsByTagResponse),
    __param(0, (0, type_graphql_1.Arg)('findByTagInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetBlogsByTagInput]),
    __metadata("design:returntype", Promise)
], GetBlogsByTagResolver.prototype, "getBlogsByTag", null);
GetBlogsByTagResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetBlogsByTagResolver);
exports.GetBlogsByTagResolver = GetBlogsByTagResolver;
