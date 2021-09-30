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
exports.GetUserBlogsResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
const mongoose_1 = __importDefault(require("mongoose"));
let BlogsArray = class BlogsArray {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BlogsArray.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BlogsArray.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BlogsArray.prototype, "blogImageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], BlogsArray.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], BlogsArray.prototype, "createdAt", void 0);
BlogsArray = __decorate([
    (0, type_graphql_1.ObjectType)()
], BlogsArray);
let NextUserBlogsParams = class NextUserBlogsParams {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextUserBlogsParams.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextUserBlogsParams.prototype, "nPerPage", void 0);
NextUserBlogsParams = __decorate([
    (0, type_graphql_1.ObjectType)()
], NextUserBlogsParams);
let GetUserBlogsResponse = class GetUserBlogsResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetUserBlogsResponse.prototype, "count", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => NextUserBlogsParams, { nullable: true }),
    __metadata("design:type", NextUserBlogsParams)
], GetUserBlogsResponse.prototype, "next", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GetUserBlogsResponse.prototype, "prevoius", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [BlogsArray], { nullable: true }),
    __metadata("design:type", Array)
], GetUserBlogsResponse.prototype, "blogs", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetUserBlogsResponse.prototype, "message", void 0);
GetUserBlogsResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetUserBlogsResponse);
let GetUserBlogInput = class GetUserBlogInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetUserBlogInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetUserBlogInput.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetUserBlogInput.prototype, "nPerPage", void 0);
GetUserBlogInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetUserBlogInput);
let GetUserBlogsResolver = class GetUserBlogsResolver {
    async getUserBlogs({ userId, pageNumber, nPerPage }) {
        try {
            let count;
            await Blog_1.default.find({ user: new mongoose_1.default.Types.ObjectId(userId) }).count().then((c) => count = c);
            const userBlogsCursor = await Blog_1.default
                .find({ user: new mongoose_1.default.Types.ObjectId(userId) })
                .sort({ createdAt: -1 })
                .select("-updatedAt -__v -user")
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage);
            if (userBlogsCursor.length === 0) {
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
                blogs: userBlogsCursor
            };
        }
        catch (error) {
            return {
                blogs: undefined,
                message: error.message
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => GetUserBlogsResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetUserBlogInput]),
    __metadata("design:returntype", Promise)
], GetUserBlogsResolver.prototype, "getUserBlogs", null);
GetUserBlogsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetUserBlogsResolver);
exports.GetUserBlogsResolver = GetUserBlogsResolver;
