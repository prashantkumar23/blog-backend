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
exports.SearchResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Blog_1 = __importDefault(require("../../models/Blog"));
let SearchInput = class SearchInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SearchInput.prototype, "term", void 0);
SearchInput = __decorate([
    (0, type_graphql_1.InputType)()
], SearchInput);
let SearchResult = class SearchResult {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SearchResult.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SearchResult.prototype, "title", void 0);
SearchResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], SearchResult);
let SearchResponse = class SearchResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], SearchResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SearchResponse.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [SearchResult], { nullable: true }),
    __metadata("design:type", Array)
], SearchResponse.prototype, "result", void 0);
SearchResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], SearchResponse);
let SearchResolver = class SearchResolver {
    async search({ term }) {
        try {
            const result = await Blog_1.default.aggregate([
                {
                    "$search": {
                        "autocomplete": {
                            "query": term,
                            "path": "title",
                            "fuzzy": {
                                "maxEdits": 1,
                                "prefixLength": 3
                            }
                        }
                    },
                },
                {
                    $limit: 2
                },
                {
                    $project: {
                        "_id": 1,
                        "title": 1,
                    }
                }
            ]);
            console.log(result);
            return {
                result
            };
        }
        catch (error) {
            return { status: false, message: error === null || error === void 0 ? void 0 : error.message };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => SearchResponse),
    __param(0, (0, type_graphql_1.Arg)('createBlogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SearchInput]),
    __metadata("design:returntype", Promise)
], SearchResolver.prototype, "search", null);
SearchResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SearchResolver);
exports.SearchResolver = SearchResolver;
