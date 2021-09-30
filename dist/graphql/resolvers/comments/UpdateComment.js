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
exports.UpdateCommentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Comment_1 = __importDefault(require("../../../models/Comment"));
const mongoose_1 = __importDefault(require("mongoose"));
let UpdateCommentInput = class UpdateCommentInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateCommentInput.prototype, "commentId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateCommentInput.prototype, "commentBody", void 0);
UpdateCommentInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateCommentInput);
let Comment = class Comment {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
Comment = __decorate([
    (0, type_graphql_1.ObjectType)()
], Comment);
let UpdateCommentResponse = class UpdateCommentResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => Comment, { nullable: true }),
    __metadata("design:type", Comment)
], UpdateCommentResponse.prototype, "comment", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UpdateCommentResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateCommentResponse.prototype, "message", void 0);
UpdateCommentResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UpdateCommentResponse);
let UpdateCommentResolver = class UpdateCommentResolver {
    async updateComment({ commentId, commentBody }) {
        try {
            return Comment_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(commentId) }, { comment: commentBody }, { new: true }).then((blogInfo) => {
                console.log(blogInfo);
                return {
                    comment: blogInfo,
                    status: true,
                    message: 'Comment updated'
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
    (0, type_graphql_1.Mutation)(() => UpdateCommentResponse),
    __param(0, (0, type_graphql_1.Arg)('updateCommentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateCommentInput]),
    __metadata("design:returntype", Promise)
], UpdateCommentResolver.prototype, "updateComment", null);
UpdateCommentResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UpdateCommentResolver);
exports.UpdateCommentResolver = UpdateCommentResolver;
