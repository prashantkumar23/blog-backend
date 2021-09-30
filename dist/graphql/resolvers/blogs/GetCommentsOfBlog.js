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
exports.GetCommentsOfBlogResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
let GetCommentsOfBlogInput = class GetCommentsOfBlogInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetCommentsOfBlogInput.prototype, "blogId", void 0);
GetCommentsOfBlogInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetCommentsOfBlogInput);
let CommentedUserOnThatBlog = class CommentedUserOnThatBlog {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CommentedUserOnThatBlog.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CommentedUserOnThatBlog.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CommentedUserOnThatBlog.prototype, "image", void 0);
CommentedUserOnThatBlog = __decorate([
    (0, type_graphql_1.ObjectType)()
], CommentedUserOnThatBlog);
let BlogComment = class BlogComment {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BlogComment.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BlogComment.prototype, "comment", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => CommentedUserOnThatBlog),
    __metadata("design:type", CommentedUserOnThatBlog)
], BlogComment.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], BlogComment.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], BlogComment.prototype, "updatedAt", void 0);
BlogComment = __decorate([
    (0, type_graphql_1.ObjectType)()
], BlogComment);
let NextCommentsParams = class NextCommentsParams {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextCommentsParams.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextCommentsParams.prototype, "nPerPage", void 0);
NextCommentsParams = __decorate([
    (0, type_graphql_1.ObjectType)()
], NextCommentsParams);
let BlogComments = class BlogComments {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BlogComments.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [BlogComment], { nullable: true }),
    __metadata("design:type", Array)
], BlogComments.prototype, "comments", void 0);
BlogComments = __decorate([
    (0, type_graphql_1.ObjectType)()
], BlogComments);
let GetCommentsOfBlogResponse = class GetCommentsOfBlogResponse {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], GetCommentsOfBlogResponse.prototype, "count", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => NextCommentsParams, { nullable: true }),
    __metadata("design:type", NextCommentsParams)
], GetCommentsOfBlogResponse.prototype, "next", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GetCommentsOfBlogResponse.prototype, "prevoius", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => BlogComments, { nullable: true }),
    __metadata("design:type", Object)
], GetCommentsOfBlogResponse.prototype, "blogComments", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetCommentsOfBlogResponse.prototype, "message", void 0);
GetCommentsOfBlogResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetCommentsOfBlogResponse);
let GetCommentsOfBlogResolver = class GetCommentsOfBlogResolver {
    async getCommentsOfBlog({ blogId }) {
        try {
            const CommentsCursor = await Blog_1.default.find({ _id: blogId })
                .select('comments')
                .populate({
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '-password -createdAt -updatedAt -__v -bio'
                },
                options: {
                    sort: {
                        createdAt: -1
                    }
                }
            });
            return {
                blogComments: CommentsCursor[0]
            };
        }
        catch (error) {
            return { blogComments: null, message: 'Not Found' };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => GetCommentsOfBlogResponse),
    __param(0, (0, type_graphql_1.Arg)('blogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetCommentsOfBlogInput]),
    __metadata("design:returntype", Promise)
], GetCommentsOfBlogResolver.prototype, "getCommentsOfBlog", null);
GetCommentsOfBlogResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetCommentsOfBlogResolver);
exports.GetCommentsOfBlogResolver = GetCommentsOfBlogResolver;
