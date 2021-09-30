import { Context } from "../../../models/Context";
import { Resolver, Query, Ctx, UseMiddleware, ObjectType, Field, Arg, InputType } from "type-graphql";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";
import BlogModel from "../../../models/Blog";
import mongoose from "mongoose";

@ObjectType()
class BlogsArray {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    blogImageUrl: string;

    @Field(() => [String])
    tags: string[];

    @Field()
    createdAt: Date
}

@ObjectType()
class NextUserBlogsParams {
    @Field()
    pageNumber: number

    @Field()
    nPerPage: number
}


@ObjectType()
class GetUserBlogsResponse {
    @Field()
    count?: number

    @Field(() => NextUserBlogsParams, { nullable: true })
    next?: NextUserBlogsParams

    @Field({ nullable: true })
    prevoius?: string;


    @Field(() => [BlogsArray], { nullable: true })
    blogs?: BlogsArray[]

    @Field()
    message?: string;
}


@InputType()
class GetUserBlogInput {
    @Field()
    userId: string;

    @Field()
    pageNumber: number

    @Field()
    nPerPage: number
}


@Resolver()
export class GetUserBlogsResolver {

    @Query(() => GetUserBlogsResponse, { nullable: true })
    async getUserBlogs(
        @Arg('userId') { userId, pageNumber, nPerPage }: GetUserBlogInput
    ): Promise<GetUserBlogsResponse | null> {
        try {
            let count;
            await BlogModel.find({ user: new mongoose.Types.ObjectId(userId) }).count().then((c) => count = c)

            const userBlogsCursor = await BlogModel
                .find({ user: new mongoose.Types.ObjectId(userId) })
                .sort({ createdAt: -1 })
                .select("-updatedAt -__v -user")
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage)



            if (userBlogsCursor.length === 0) {
                return {
                    count,
                    next: undefined,
                    prevoius: '',
                    blogs: undefined
                }
            }
            return {
                count,
                next: {
                    pageNumber: pageNumber + 1,
                    nPerPage
                },
                prevoius: '',
                blogs: userBlogsCursor
            }

        } catch (error: any) {
            return {
                blogs: undefined,
                message: error.message
            }
        }
    }
}
