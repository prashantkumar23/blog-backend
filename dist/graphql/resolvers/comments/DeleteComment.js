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
exports.DeleteCommentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../../models/Blog"));
const Comment_1 = __importDefault(require("../../../models/Comment"));
const mongoose_1 = __importDefault(require("mongoose"));
let DeleteCommentInput = class DeleteCommentInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteCommentInput.prototype, "blogId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteCommentInput.prototype, "commentId", void 0);
DeleteCommentInput = __decorate([
    (0, type_graphql_1.InputType)()
], DeleteCommentInput);
let DeleteCommentResponse = class DeleteCommentResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], DeleteCommentResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DeleteCommentResponse.prototype, "message", void 0);
DeleteCommentResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], DeleteCommentResponse);
let DeleteCommentResolver = class DeleteCommentResolver {
    async deleteComment({ blogId, commentId }) {
        try {
            return Comment_1.default.findOneAndDelete({ _id: new mongoose_1.default.Types.ObjectId(commentId) })
                .then((blogInfo) => {
                Blog_1.default.findOneAndUpdate({
                    _id: new mongoose_1.default.Types.ObjectId(blogId),
                }, { $pull: { comments: new mongoose_1.default.Types.ObjectId(commentId) } }, { new: true }).populate({
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'user',
                        model: 'User',
                    },
                });
                return {
                    status: true,
                    message: 'Comment Deleted!'
                };
            });
        }
        catch (e) {
            return {
                status: false,
                message: e.message
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => DeleteCommentResponse),
    __param(0, (0, type_graphql_1.Arg)('updateCommentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteCommentInput]),
    __metadata("design:returntype", Promise)
], DeleteCommentResolver.prototype, "deleteComment", null);
DeleteCommentResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], DeleteCommentResolver);
exports.DeleteCommentResolver = DeleteCommentResolver;
