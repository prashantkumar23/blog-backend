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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTopicsResolver = void 0;
const type_graphql_1 = require("type-graphql");
const topics_1 = require("../../../helpers/topics");
let Topic = class Topic {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Topic.prototype, "topicName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Topic.prototype, "topicDescription", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Topic.prototype, "topicColorCode", void 0);
Topic = __decorate([
    (0, type_graphql_1.ObjectType)()
], Topic);
let GetAllTopicsResponse = class GetAllTopicsResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [Topic]),
    __metadata("design:type", Array)
], GetAllTopicsResponse.prototype, "topics", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GetAllTopicsResponse.prototype, "message", void 0);
GetAllTopicsResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetAllTopicsResponse);
let GetAllTopicsResolver = class GetAllTopicsResolver {
    async getAllTopics() {
        try {
            return await {
                topics: topics_1.TOPICS
            };
        }
        catch (error) {
            return {
                message: error.message
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => GetAllTopicsResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetAllTopicsResolver.prototype, "getAllTopics", null);
GetAllTopicsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GetAllTopicsResolver);
exports.GetAllTopicsResolver = GetAllTopicsResolver;
