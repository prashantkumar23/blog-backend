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
exports.CreateBlogResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
let CreateBlogInput = class CreateBlogInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBlogInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBlogInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBlogInput.prototype, "body", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBlogInput.prototype, "blogImageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CreateBlogInput.prototype, "tags", void 0);
CreateBlogInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateBlogInput);
let CreateBlogResponse = class CreateBlogResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], CreateBlogResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBlogResponse.prototype, "message", void 0);
CreateBlogResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], CreateBlogResponse);
let CreateBlogResolver = class CreateBlogResolver {
    async createBlog({ userId, title, body, tags, blogImageUrl }) {
        try {
            await Blog_1.default.create({
                user: userId,
                title,
                body,
                tags,
                blogImageUrl
            });
            return {
                status: true,
                message: "Blog Published!"
            };
        }
        catch (error) {
            return { status: false, message: error === null || error === void 0 ? void 0 : error.message };
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => CreateBlogResponse),
    __param(0, (0, type_graphql_1.Arg)('createBlogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBlogInput]),
    __metadata("design:returntype", Promise)
], CreateBlogResolver.prototype, "createBlog", null);
CreateBlogResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CreateBlogResolver);
exports.CreateBlogResolver = CreateBlogResolver;
