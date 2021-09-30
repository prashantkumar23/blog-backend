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
exports.DeleteBlogResolver = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const isAuthenticated_1 = require("../../../middlewares/isAuthenticated");
const Blog_1 = __importDefault(require("../../../models/Blog"));
let DeleteBlogInput = class DeleteBlogInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteBlogInput.prototype, "blogId", void 0);
DeleteBlogInput = __decorate([
    (0, type_graphql_1.InputType)()
], DeleteBlogInput);
let DeleteBlogResponse = class DeleteBlogResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteBlogResponse.prototype, "message", void 0);
DeleteBlogResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], DeleteBlogResponse);
let DeleteBlogResolver = class DeleteBlogResolver {
    async deleteBlog({ blogId }) {
        try {
            return Blog_1.default.findOneAndDelete({ _id: new mongoose_1.default.Types.ObjectId(blogId) }).then(() => {
                return {
                    message: 'Deleted Successfully'
                };
            });
        }
        catch (error) {
            return { message: "Can't be deleted" };
        }
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuthenticated_1.isAuthenticated),
    (0, type_graphql_1.Mutation)(() => DeleteBlogResponse),
    __param(0, (0, type_graphql_1.Arg)('deleteBlogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteBlogInput]),
    __metadata("design:returntype", Promise)
], DeleteBlogResolver.prototype, "deleteBlog", null);
DeleteBlogResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], DeleteBlogResolver);
exports.DeleteBlogResolver = DeleteBlogResolver;
