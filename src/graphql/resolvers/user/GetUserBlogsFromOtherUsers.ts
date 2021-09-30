import { Resolver, Query, ObjectType, Field, Arg, InputType } from "type-graphql";
import BlogModel from "../../../models/Blog";
import UserModel from "../../../models/User";

@ObjectType()
class UserInformation2 {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    image: string;

    @Field()
    bio: string;
}

@ObjectType()
class UserBlogsArray {
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

    @Field(() => UserInformation2)
    user: UserInformation2
}

@ObjectType()
class NextUserBlogsParams2 {
    @Field()
    pageNumber: number

    @Field()
    nPerPage: number
}


@ObjectType()
class GetUserBlogsFromOtherUsersResponse {
    @Field()
    count?: number

    @Field(() => NextUserBlogsParams2, { nullable: true })
    next?: NextUserBlogsParams2

    @Field({ nullable: true })
    prevoius?: string;


    @Field(() => [UserBlogsArray], { nullable: true })
    blogs?: UserBlogsArray[]

    @Field()
    message?: string;
}


@InputType()
class GetUserBlogsFromOtherUsersInput {
    @Field()
    name: string;

    @Field()
    pageNumber: number

    @Field()
    nPerPage: number
}


@Resolver()
export class GetUserBlogsFromOtherUsersResolver {
    @Query(() => GetUserBlogsFromOtherUsersResponse, { nullable: true })
    async getUserBlogsFromOtherUsers(
        @Arg('getUserBlogsFromOtherUsersInput') { name, pageNumber, nPerPage }: GetUserBlogsFromOtherUsersInput
    ): Promise<GetUserBlogsFromOtherUsersResponse | null> {
        try {
            let count;
            let blogs;

            await BlogModel
                .find()
                .sort({ createdAt: -1 })
                .select("user -_id")
                .populate({
                    path: 'user',
                    model: 'User',
                    select: 'name -_id',
                })
                .then((blogs) => {
                    count = blogs.filter(function (blog) {
                        return blog.user.name === name
                    }).length
                })


            await BlogModel
                .find()
                .sort({ createdAt: -1 })
                .select("-updatedAt -__v -body -comments")
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage)
                .populate({
                    path: 'user',
                    model: 'User',
                    select: '_id name image bio',
                })
                .then((b) => {
                    blogs = b.filter(function (blog) {
                        return blog.user.name === name
                    })
                })


            if (blogs.length === 0) {
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
                blogs: blogs
            }

        } catch (error: any) {
            return {
                blogs: undefined,
                message: error.message
            }
        }
    }
}
