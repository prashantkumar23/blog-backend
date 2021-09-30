"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
dotenv.config();
const mongodb_1 = require("mongodb");
const tags_1 = __importDefault(require("./tags"));
const faker_1 = __importDefault(require("faker"));
const MongoClient = require("mongodb").MongoClient;
async function seedDB() {
    const uri = `mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@${process.env.mongo_host_name}/${process.env.mongo_db_name}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const UserCollection = client.db("blog").collection("users");
        const BlogCollection = client.db("blog").collection("blogs");
        const CommentCollection = client.db("blog").collection("comments");
        await UserCollection.drop();
        await BlogCollection.drop();
        await CommentCollection.drop();
        let UserData = [];
        let BlogData = [];
        let CommentData = [];
        for (let i = 0; i < 1000; i++) {
            const userId = new mongodb_1.ObjectId();
            const username = faker_1.default.internet.userName();
            const password = faker_1.default.internet.password();
            const createdAt = faker_1.default.date.past();
            const updatedAt = faker_1.default.date.past();
            const imageUrl = faker_1.default.internet.avatar();
            for (let i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
                const blogId = new mongodb_1.ObjectId();
                const title = faker_1.default.lorem.sentence();
                const body = faker_1.default.lorem.paragraphs((Math.floor(Math.random() * 15) + 1));
                const blogImageUrl = faker_1.default.image.abstract();
                const tags = await (0, tags_1.default)();
                const user = userId;
                let comments = [];
                const createdAt = faker_1.default.date.past();
                const updatedAt = faker_1.default.date.past();
                for (let i = 0; i < Math.floor(Math.random() * 25) + 1; i++) {
                    const commnetId = new mongodb_1.ObjectId();
                    comments.push(commnetId);
                    const commentData = faker_1.default.lorem.paragraph();
                    const commentedUserId = userId;
                    const createdAt = faker_1.default.date.past();
                    const updatedAt = faker_1.default.date.past();
                    CommentData.push({
                        _id: commnetId,
                        comment: commentData,
                        user: commentedUserId,
                        createdAt,
                        updatedAt
                    });
                }
                BlogData.push({
                    _id: blogId,
                    title,
                    body,
                    blogImageUrl,
                    tags,
                    user,
                    comments,
                    createdAt,
                    updatedAt
                });
            }
            UserData.push({
                _id: userId,
                username,
                password,
                createdAt,
                updatedAt,
                imageUrl
            });
        }
        await UserCollection.insertMany(UserData);
        await BlogCollection.insertMany(BlogData);
        await CommentCollection.insertMany(CommentData);
        console.log("Database seeded! :)");
        client.close();
    }
    catch (err) {
        console.log(err);
    }
}
seedDB();
