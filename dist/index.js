"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
dotenv.config();
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const path_1 = __importDefault(require("path"));
const type_graphql_1 = require("type-graphql");
const object_id_scalar_1 = require("./graphql/schemas/object-id.scalar");
const mongoHelpers_1 = require("./helpers/mongoHelpers");
const CreateBlog_1 = require("./graphql/resolvers/blogs/CreateBlog");
const GetBlog_1 = require("./graphql/resolvers/blogs/GetBlog");
const GetBlogs_1 = require("./graphql/resolvers/blogs/GetBlogs");
const AddComment_1 = require("./graphql/resolvers/comments/AddComment");
const UpdateComment_1 = require("./graphql/resolvers/comments/UpdateComment");
const DeleteComment_1 = require("./graphql/resolvers/comments/DeleteComment");
const Dashboard_1 = require("./graphql/resolvers/Dashboard");
const ImageUpload_1 = require("./graphql/resolvers/ImageUpload");
const GetTopTagsByNumberOfPost_1 = require("./graphql/resolvers/tags/GetTopTagsByNumberOfPost");
const GetBlogsByTag_1 = require("./graphql/resolvers/tags/GetBlogsByTag");
const GetUserInfo_1 = require("./graphql/resolvers/user/GetUserInfo");
const GetUserBlogs_1 = require("./graphql/resolvers/user/GetUserBlogs");
const AutocompleteSearch_1 = require("./graphql/resolvers/AutocompleteSearch");
const GetCommentsOfBlog_1 = require("./graphql/resolvers/blogs/GetCommentsOfBlog");
const UpdateBio_1 = require("./graphql/resolvers/user/UpdateBio");
const GetAllTopics_1 = require("./graphql/resolvers/tags/GetAllTopics");
const GetTopBlogsByTopic_1 = require("./graphql/resolvers/blogs/GetTopBlogsByTopic");
const GetUserBlogsFromOtherUsers_1 = require("./graphql/resolvers/user/GetUserBlogsFromOtherUsers");
const GetListOfUsers_1 = require("./graphql/resolvers/user/GetListOfUsers");
const GetUserInfoFromName_1 = require("./graphql/resolvers/user/GetUserInfoFromName");
const mHelper = new mongoHelpers_1.MongoHelper();
mHelper.initiateMongoConnection();
async function apolloServerStart() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [
            CreateBlog_1.CreateBlogResolver,
            GetBlog_1.GetBlogResolver,
            GetBlogs_1.GetBlogsResolver,
            AddComment_1.AddCommentResolver,
            UpdateComment_1.UpdateCommentResolver,
            DeleteComment_1.DeleteCommentResolver,
            Dashboard_1.DashboardResolver,
            ImageUpload_1.ImageUploadResolver,
            GetTopTagsByNumberOfPost_1.GetTopTagsByNumberOfPostResolver,
            GetBlogsByTag_1.GetBlogsByTagResolver,
            GetUserInfo_1.GetUserInfoResolver,
            GetUserBlogs_1.GetUserBlogsResolver,
            GetCommentsOfBlog_1.GetCommentsOfBlogResolver,
            AutocompleteSearch_1.SearchResolver,
            UpdateBio_1.UpdateBioResolver,
            GetAllTopics_1.GetAllTopicsResolver,
            GetTopBlogsByTopic_1.GetTopBlogsByTopicResolver,
            GetUserBlogsFromOtherUsers_1.GetUserBlogsFromOtherUsersResolver,
            GetListOfUsers_1.GetListOfUsersResolver,
            GetUserInfoFromName_1.GetUserInfoFromNameResolver
        ],
        emitSchemaFile: path_1.default.resolve(__dirname, 'schema.gql'),
        scalarsMap: [{ type: mongodb_1.ObjectId, scalar: object_id_scalar_1.ObjectIdScalar }],
        validate: false,
        dateScalarMode: "isoDate",
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res, }) => {
            return {
                req,
                res,
            };
        },
    });
    await server.start();
    const app = (0, express_1.default)();
    app.use(express_1.default.json({ limit: 1024 * 1024 * 10, type: 'application/json' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: 1024 * 1024 * 10, type: 'application/x-www-form-urlencoded' }));
    server.applyMiddleware({ app, path: "/api" });
    app.listen({ port: process.env.PORT || 4000 }, () => console.log(`GraphQL is now running on http://localhost:${process.env.PORT}/graphql`));
}
apolloServerStart();
