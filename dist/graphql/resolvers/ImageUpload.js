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
exports.ImageUploadResponse = exports.ImageUploadResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../../models/User"));
const cloudinary = require('cloudinary').v2;
let ImageUploadInput = class ImageUploadInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ImageUploadInput.prototype, "photo", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ImageUploadInput.prototype, "username", void 0);
ImageUploadInput = __decorate([
    (0, type_graphql_1.InputType)()
], ImageUploadInput);
let ImageUploadResolver = class ImageUploadResolver {
    async imageUpload({ photo, username }) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log(photo.slice(0, 100));
        const result = await cloudinary.uploader.upload(photo, {
            allowed_formats: ["jpg", "png"],
            public_id: "",
            folder: "test",
        });
        if (result.secure_url) {
            console.log(result);
            return await User_1.default.findOneAndUpdate({ username }, { imageUrl: result.secure_url }).then((user) => {
                return {
                    status: true,
                    message: "Uploaded Succesfully",
                    url: result.secure_url
                };
            });
        }
        else {
            return {
                status: false,
                message: "Image upload fail",
            };
        }
    }
    catch(error) {
        return {
            status: true,
            message: error.message
        };
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => ImageUploadResponse),
    __param(0, (0, type_graphql_1.Arg)('imageUploadInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ImageUploadInput]),
    __metadata("design:returntype", Promise)
], ImageUploadResolver.prototype, "imageUpload", null);
ImageUploadResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ImageUploadResolver);
exports.ImageUploadResolver = ImageUploadResolver;
let ImageUploadResponse = class ImageUploadResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ImageUploadResponse.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ImageUploadResponse.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ImageUploadResponse.prototype, "url", void 0);
ImageUploadResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ImageUploadResponse);
exports.ImageUploadResponse = ImageUploadResponse;
