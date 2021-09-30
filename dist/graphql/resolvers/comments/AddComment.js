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
exports.AddCommentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Comment_1 = __importDefault(require("../../../models/Comment"));
const Blog_1 = __importDefault(require("../../../models/Blog"));
const mongoose_1 = __importDefault(require("mongoose"));
let AddCommentInput = class AddCommentInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddCommentInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddCommentInput.prototype, "commentBody", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddCommentInput.prototype, "blogId", void 0);
AddCommentInput = __decorate([
    (0, type_graphql_1.InputType)()
], AddCommentInput);
let AddCommentResponse = class AddCommentResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], AddCommentResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AddCommentResponse.prototype, "comment", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddCommentResponse.prototype, "message", void 0);
AddCommentResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AddCommentResponse);
let AddCommentResolver = class AddCommentResolver {
    async addComment({ userId, commentBody, blogId }) {
        try {
            let comment = '';
            return await Comment_1.default
                .create({ comment: commentBody, user: userId })
                .then((commentInfo) => {
                comment = commentInfo.comment;
                Blog_1.default.findOneAndUpdate({
                    _id: new mongoose_1.default.Types.ObjectId(blogId),
                }, { $push: { comments: commentInfo._id } }, { new: true }).populate({
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'user',
                        model: 'User',
                    },
                }).
                    then(() => null);
            })
                .then((data) => {
                return {
                    status: true,
                    comment,
                    message: 'Comment Added',
                };
            })
                .catch((err) => {
                console.log(err.message);
                throw err;
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
    (0, type_graphql_1.Mutation)(() => AddCommentResponse),
    __param(0, (0, type_graphql_1.Arg)('addCommentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddCommentInput]),
    __metadata("design:returntype", Promise)
], AddCommentResolver.prototype, "addComment", null);
AddCommentResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AddCommentResolver);
exports.AddCommentResolver = AddCommentResolver;
