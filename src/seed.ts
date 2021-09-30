/* mySeedScript.js */

const dotenv = require('dotenv')
dotenv.config();

import { ObjectId } from "mongodb";
import generateRandomTags from "./tags";
import faker from 'faker';
const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
    // Connection URL
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

        // await client.db("blog").createCollection('users');
        // await client.db("blog").createCollection('blogs');
        // await client.db("blog").createCollection("comments")

        let UserData: any = [];
        let BlogData: any = [];
        let CommentData: any = [];


        for (let i = 0; i < 1000; i++) {
            const userId = new ObjectId();
            const username = faker.internet.userName();
            const password = faker.internet.password();
            const createdAt = faker.date.past();
            const updatedAt = faker.date.past();
            const imageUrl = faker.internet.avatar();


            // For every user, we generate some blogs 
            for (let i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {

                //BlogData
                const blogId = new ObjectId();
                const title = faker.lorem.sentence();
                const body = faker.lorem.paragraphs((Math.floor(Math.random() * 15) + 1));
                const blogImageUrl = faker.image.abstract();
                const tags = await generateRandomTags();
                const user = userId;
                let comments: ObjectId[] = [];
                const createdAt = faker.date.past();
                const updatedAt = faker.date.past();


                //For random Comments
                for (let i = 0; i < Math.floor(Math.random() * 25) + 1; i++) {
                    const commnetId = new ObjectId();
                    comments.push(commnetId);

                    const commentData = faker.lorem.paragraph();
                    const commentedUserId = userId;
                    const createdAt = faker.date.past();
                    const updatedAt = faker.date.past();

                    CommentData.push({
                        _id: commnetId,
                        comment: commentData,
                        user: commentedUserId,
                        createdAt,
                        updatedAt
                    })
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
                })
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
    } catch (err) {
        console.log(err);
    }
}

seedDB();