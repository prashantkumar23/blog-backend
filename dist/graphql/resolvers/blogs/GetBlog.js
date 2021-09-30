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
exports.GetBlogResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
let GetBlogInput = class GetBlogInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetBlogInput.prototype, "blogId", void 0);
GetBlogInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetBlogInput);
let UserCreated = class UserCreated {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserCreated.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserCreated.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserCreated.prototype, "image", void 0);
UserCreated = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserCreated);
let Blog = class Blog {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Blog.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Blog.prototype, "body", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Blog.prototype, "blogImageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserCreated),
    __metadata("design:type", UserCreated)
], Blog.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Blog.prototype, "tags", void 0);
Blog = __decorate([
    (0, type_graphql_1.ObjectType)()
], Blog);
let GetBlogResponse = class GetBlogResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => Blog, { nullable: true }),
    __metadata("design:type", Object)
], GetBlogResponse.prototype, "blog", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetBlogResponse.prototype, "message", void 0);
GetBlogResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetBlogResponse);
let GetBlogResolver = class GetBlogResolver {
    async getBlog({ blogId }) {
        try {
            return Blog_1.default
                .findOne({ _id: blogId })
                .select('-comments')
                .populate({
                path: 'user',
                model: 'User',
                select: '-password -createdAt -updatedAt -__v -bio',
            })
                .then((blog) => {
                return {
                    blog
                };
            });
        }
        catch (error) {
            return { blog: null, message: 'Not Found' };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => GetBlogResponse),
    __param(0, (0, type_graphql_1.Arg)('blogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetBlogInput]),
    __metadata("design:returntype", Promise)
], GetBlogResolver.prototype, "getBlog", null);
GetBlogResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetBlogResolver);
exports.GetBlogResolver = GetBlogResolver;
