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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardResponse = exports.DashboardResolver = void 0;
const type_graphql_1 = require("type-graphql");
const http_errors_1 = __importDefault(require("http-errors"));
const isAuthenticated_1 = require("../../middlewares/isAuthenticated");
let DashboardResolver = class DashboardResolver {
    async dashboard() {
        try {
            console.log('Dashboard');
            return {
                status: true,
                message: 'Dashboard'
            };
        }
        catch (error) {
            return {
                status: false,
                message: http_errors_1.default.InternalServerError()
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => DashboardResponse),
    (0, type_graphql_1.UseMiddleware)(isAuthenticated_1.isAuthenticated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "dashboard", null);
DashboardResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], DashboardResolver);
exports.DashboardResolver = DashboardResolver;
let DashboardResponse = class DashboardResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], DashboardResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], DashboardResponse.prototype, "message", void 0);
DashboardResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], DashboardResponse);
exports.DashboardResponse = DashboardResponse;
