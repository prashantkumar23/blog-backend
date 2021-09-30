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
exports.UpdateBlogResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
const mongoose_1 = __importDefault(require("mongoose"));
const isAuthenticated_1 = require("../../../middlewares/isAuthenticated");
let UpdateBlogInput = class UpdateBlogInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateBlogInput.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateBlogInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateBlogInput.prototype, "body", void 0);
UpdateBlogInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateBlogInput);
let UpdateBlogResponse = class UpdateBlogResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UpdateBlogResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateBlogResponse.prototype, "message", void 0);
UpdateBlogResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UpdateBlogResponse);
let UpdateBlogResolver = class UpdateBlogResolver {
    async updateBlog({ _id, title, body }) {
        try {
            return Blog_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(_id) }, { title, body }, { new: true })
                .then((blogInfo) => {
                console.log(blogInfo);
                return {
                    status: true,
                    message: "Updated Succesfully"
                };
            });
        }
        catch (error) {
            return { status: false, message: error.message };
        }
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuthenticated_1.isAuthenticated),
    (0, type_graphql_1.Mutation)(() => UpdateBlogResponse),
    __param(0, (0, type_graphql_1.Arg)('updateBlogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateBlogInput]),
    __metadata("design:returntype", Promise)
], UpdateBlogResolver.prototype, "updateBlog", null);
UpdateBlogResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UpdateBlogResolver);
exports.UpdateBlogResolver = UpdateBlogResolver;
