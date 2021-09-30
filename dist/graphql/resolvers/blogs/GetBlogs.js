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
exports.GetBlogsResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
let UserInfo = class UserInfo {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInfo.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInfo.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInfo.prototype, "image", void 0);
UserInfo = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserInfo);
let Blogs = class Blogs {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Blogs.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Blogs.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Blogs.prototype, "blogImageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Blogs.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Blogs.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserInfo),
    __metadata("design:type", UserInfo)
], Blogs.prototype, "user", void 0);
Blogs = __decorate([
    (0, type_graphql_1.ObjectType)()
], Blogs);
let NextBlogsParams = class NextBlogsParams {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextBlogsParams.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextBlogsParams.prototype, "nPerPage", void 0);
NextBlogsParams = __decorate([
    (0, type_graphql_1.ObjectType)()
], NextBlogsParams);
let GetBlogsResponse = class GetBlogsResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetBlogsResponse.prototype, "count", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => NextBlogsParams, { nullable: true }),
    __metadata("design:type", NextBlogsParams)
], GetBlogsResponse.prototype, "next", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GetBlogsResponse.prototype, "prevoius", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Blogs], { nullable: true }),
    __metadata("design:type", Array)
], GetBlogsResponse.prototype, "blogs", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetBlogsResponse.prototype, "message", void 0);
GetBlogsResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetBlogsResponse);
let GetBlogsInput = class GetBlogsInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetBlogsInput.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetBlogsInput.prototype, "nPerPage", void 0);
GetBlogsInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetBlogsInput);
let GetBlogsResolver = class GetBlogsResolver {
    async getBlogs({ pageNumber, nPerPage }) {
        try {
            let count;
            await Blog_1.default.count().then((c) => count = c);
            const blogsCursor = await Blog_1.default.find()
                .sort({ createdAt: -1 })
                .select('_id title createdAt blogImageUrl tags')
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage)
                .populate({
                path: 'user',
                model: 'User',
                select: '_id name image',
            });
            if (blogsCursor.length === 0) {
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
                blogs: blogsCursor
            };
        }
        catch (error) {
            return { blogs: undefined, message: 'Not Found' };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => GetBlogsResponse),
    __param(0, (0, type_graphql_1.Arg)('getBlogsInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetBlogsInput]),
    __metadata("design:returntype", Promise)
], GetBlogsResolver.prototype, "getBlogs", null);
GetBlogsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetBlogsResolver);
exports.GetBlogsResolver = GetBlogsResolver;
