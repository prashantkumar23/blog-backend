const dotenv = require('dotenv')
dotenv.config();
import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { ObjectId } from 'mongodb';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { ObjectIdScalar } from './graphql/schemas/object-id.scalar';
import { MongoHelper } from './helpers/mongoHelpers';

//Blog Resolvers
import { CreateBlogResolver } from './graphql/resolvers/blogs/CreateBlog';
import { GetBlogResolver } from './graphql/resolvers/blogs/GetBlog';
import { GetBlogsResolver } from './graphql/resolvers/blogs/GetBlogs';

//Commnet Resolvers
import { AddCommentResolver } from './graphql/resolvers/comments/AddComment'
import { UpdateCommentResolver } from './graphql/resolvers/comments/UpdateComment';
import { DeleteCommentResolver } from './graphql/resolvers/comments/DeleteComment';

//Protected Routes
import { DashboardResolver } from './graphql/resolvers/Dashboard';
import { ImageUploadResolver } from './graphql/resolvers/ImageUpload';

//Tag Related Resolver
import { GetTopTagsByNumberOfPostResolver } from './graphql/resolvers/tags/GetTopTagsByNumberOfPost';
import { GetBlogsByTagResolver } from './graphql/resolvers/tags/GetBlogsByTag';

//User Related Resolver
import { GetUserInfoResolver } from './graphql/resolvers/user/GetUserInfo';
import { GetUserBlogsResolver } from './graphql/resolvers/user/GetUserBlogs';
import { SearchResolver } from './graphql/resolvers/AutocompleteSearch';
import { GetCommentsOfBlogResolver } from './graphql/resolvers/blogs/GetCommentsOfBlog';
import { UpdateBioResolver } from './graphql/resolvers/user/UpdateBio';
import { GetAllTopicsResolver } from './graphql/resolvers/tags/GetAllTopics';
import { GetTopBlogsByTopicResolver } from './graphql/resolvers/blogs/GetTopBlogsByTopic';
import { GetUserBlogsFromOtherUsersResolver } from './graphql/resolvers/user/GetUserBlogsFromOtherUsers';
import { GetListOfUsersResolver } from './graphql/resolvers/user/GetListOfUsers';
import { GetUserInfoFromNameResolver } from './graphql/resolvers/user/GetUserInfoFromName';

const mHelper = new MongoHelper();
mHelper.initiateMongoConnection();



async function apolloServerStart() {


    const schema = await buildSchema({
        resolvers: [
            CreateBlogResolver,
            GetBlogResolver,
            GetBlogsResolver,
            AddCommentResolver,
            UpdateCommentResolver,
            DeleteCommentResolver,
            DashboardResolver,
            ImageUploadResolver,
            GetTopTagsByNumberOfPostResolver,
            GetBlogsByTagResolver,
            GetUserInfoResolver,
            GetUserBlogsResolver,
            GetCommentsOfBlogResolver,
            SearchResolver,
            UpdateBioResolver,
            GetAllTopicsResolver,
            GetTopBlogsByTopicResolver,
            GetUserBlogsFromOtherUsersResolver,
            GetListOfUsersResolver,
            GetUserInfoFromNameResolver
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        // 3. use ObjectId scalar mapping
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
        validate: false,
        dateScalarMode: "isoDate",
    })

    const server = new ApolloServer({
        schema,
        context: ({ req, res, }) => {
            return {
                req,
                res,

            }
        },

    })

    await server.start();
    const app = express();
    // app.use(morgan('dev'))
    app.use(express.json({ limit: 1024 * 1024 * 10, type: 'application/json' }));
    // app.use(json({ limit: '2mb' }));
    app.use(express.urlencoded({ extended: true, limit: 1024 * 1024 * 10, type: 'application/x-www-form-urlencoded' }))
    server.applyMiddleware({ app, path: "/api" });
    app.listen({ port: process.env.PORT || 4000 }, (): void =>
        console.log(`GraphQL is now running on http://localhost:${process.env.PORT}/graphql`)
    );
}

apolloServerStart();




