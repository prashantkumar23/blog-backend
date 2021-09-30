import { Query, Resolver, Field, ObjectType, InputType, Arg } from "type-graphql";
import BlogModel from '../../../models/Blog';

@ObjectType()
class UserInfo {
    @Field()
    _id: string

    @Field()
    name: string;

    @Field()
    image: string;
}

@ObjectType()
class Blogs {
    @Field()
    _id: string;

    @Field()
    title: string;

    @Field()
    blogImageUrl: string;

    @Field(() => [String])
    tags: string[]

    @Field()
    createdAt: Date

    @Field(() => UserInfo)
    user: UserInfo
}


@ObjectType()
class NextBlogsParams {
    @Field()
    pageNumber: number

    @Field()
    nPerPage: number
}

@ObjectType()
class GetBlogsResponse {

    @Field()
    count?: number

    @Field(() => NextBlogsParams, { nullable: true })
    next?: NextBlogsParams

    @Field({ nullable: true })
    prevoius?: string;

    @Field(() => [Blogs], { nullable: true })
    blogs?: [Blogs]

    @Field(() => String, { nullable: true })
    message?: string;
}

@InputType()
class GetBlogsInput {
    @Field()
    pageNumber: number

    @Field()
    nPerPage: number
}

@Resolver()
export class GetBlogsResolver {
    @Query(() => GetBlogsResponse)
    async getBlogs(
        @Arg('getBlogsInput') { pageNumber, nPerPage }: GetBlogsInput,
    ): Promise<GetBlogsResponse> {
        try {
            let count;
            await BlogModel.count().then((c) => count = c)

            const blogsCursor = await BlogModel.find()
                .sort({ createdAt: -1 })
                .select('_id title createdAt blogImageUrl tags')
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage)
                .populate({
                    path: 'user',
                    model: 'User',
                    select: '_id name image',
                })

            if (blogsCursor.length === 0) {
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
                blogs: blogsCursor
            }
        } catch (error) {
            return { blogs: undefined, message: 'Not Found' }
        }
    }
}