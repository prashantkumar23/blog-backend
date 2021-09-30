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
exports.GetUserBlogsFromOtherUsersResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
let UserInformation2 = class UserInformation2 {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInformation2.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInformation2.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInformation2.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInformation2.prototype, "bio", void 0);
UserInformation2 = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserInformation2);
let UserBlogsArray = class UserBlogsArray {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserBlogsArray.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserBlogsArray.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserBlogsArray.prototype, "blogImageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], UserBlogsArray.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], UserBlogsArray.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserInformation2),
    __metadata("design:type", UserInformation2)
], UserBlogsArray.prototype, "user", void 0);
UserBlogsArray = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserBlogsArray);
let NextUserBlogsParams2 = class NextUserBlogsParams2 {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextUserBlogsParams2.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], NextUserBlogsParams2.prototype, "nPerPage", void 0);
NextUserBlogsParams2 = __decorate([
    (0, type_graphql_1.ObjectType)()
], NextUserBlogsParams2);
let GetUserBlogsFromOtherUsersResponse = class GetUserBlogsFromOtherUsersResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetUserBlogsFromOtherUsersResponse.prototype, "count", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => NextUserBlogsParams2, { nullable: true }),
    __metadata("design:type", NextUserBlogsParams2)
], GetUserBlogsFromOtherUsersResponse.prototype, "next", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GetUserBlogsFromOtherUsersResponse.prototype, "prevoius", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [UserBlogsArray], { nullable: true }),
    __metadata("design:type", Array)
], GetUserBlogsFromOtherUsersResponse.prototype, "blogs", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetUserBlogsFromOtherUsersResponse.prototype, "message", void 0);
GetUserBlogsFromOtherUsersResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetUserBlogsFromOtherUsersResponse);
let GetUserBlogsFromOtherUsersInput = class GetUserBlogsFromOtherUsersInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetUserBlogsFromOtherUsersInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetUserBlogsFromOtherUsersInput.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GetUserBlogsFromOtherUsersInput.prototype, "nPerPage", void 0);
GetUserBlogsFromOtherUsersInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetUserBlogsFromOtherUsersInput);
let GetUserBlogsFromOtherUsersResolver = class GetUserBlogsFromOtherUsersResolver {
    async getUserBlogsFromOtherUsers({ name, pageNumber, nPerPage }) {
        try {
            let count;
            let blogs;
            await Blog_1.default
                .find()
                .sort({ createdAt: -1 })
                .select("user -_id")
                .populate({
                path: 'user',
                model: 'User',
                select: 'name -_id',
            })
                .then((blogs) => {
                count = blogs.filter(function (blog) {
                    return blog.user.name === name;
                }).length;
            });
            await Blog_1.default
                .find()
                .sort({ createdAt: -1 })
                .select("-updatedAt -__v -body -comments")
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage)
                .populate({
                path: 'user',
                model: 'User',
                select: '_id name image bio',
            })
                .then((b) => {
                blogs = b.filter(function (blog) {
                    return blog.user.name === name;
                });
            });
            if (blogs.length === 0) {
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
                blogs: blogs
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
    (0, type_graphql_1.Query)(() => GetUserBlogsFromOtherUsersResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('getUserBlogsFromOtherUsersInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetUserBlogsFromOtherUsersInput]),
    __metadata("design:returntype", Promise)
], GetUserBlogsFromOtherUsersResolver.prototype, "getUserBlogsFromOtherUsers", null);
GetUserBlogsFromOtherUsersResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetUserBlogsFromOtherUsersResolver);
exports.GetUserBlogsFromOtherUsersResolver = GetUserBlogsFromOtherUsersResolver;
