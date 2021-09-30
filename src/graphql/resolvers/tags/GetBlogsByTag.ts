import { Query, Resolver, InputType, Field, ObjectType, Arg } from "type-graphql";
import BlogModel from '../../../models/Blog';

@InputType()
class GetBlogsByTagInput {
    @Field()
    tag: string;

    @Field()
    pageNumber: number

    @Field()
    nPerPage: number
}


@ObjectType()
class UserInfoTwo {
    @Field()
    _id: string

    @Field()
    name: string;

    @Field()
    image: string;
}

@ObjectType()
class BlogByTag {
    @Field()
    _id: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    blogImageUrl: string;

    @Field()
    createdAt: Date

    @Field(() => [String], { nullable: true })
    tags: [string];

    @Field(() => UserInfoTwo, { nullable: true })
    user: UserInfoTwo
}

@ObjectType()
class NextTopicParams {
    @Field()
    pageNumber: number

    @Field()
    nPerPage: number
}

@ObjectType()
class GetBlogsByTagResponse {
    @Field()
    count?: number

    @Field(() => NextTopicParams, { nullable: true })
    next?: NextTopicParams

    @Field({ nullable: true })
    prevoius?: string;

    @Field(() => [BlogByTag], { nullable: true })
    blogs?: BlogByTag[]

    @Field()
    message?: string
}

@Resolver()
export class GetBlogsByTagResolver {
    @Query(() => GetBlogsByTagResponse)
    async getBlogsByTag(
        @Arg('findByTagInput') { tag, pageNumber, nPerPage }: GetBlogsByTagInput
    ): Promise<GetBlogsByTagResponse> {
        try {

            let count;
            await BlogModel.find({ tags: tag }).count().then((c) => count = c)

            const blogsByTopic = await BlogModel
                .find({ tags: tag })
                .sort({ createdAt: -1 })
                .select('_id title createdAt tags blogImageUrl')
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage)
                .populate({
                    path: 'user',
                    model: 'User',
                    select: '-password -createdAt -updatedAt -__v'
                })


            if (blogsByTopic.length === 0) {
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
                blogs: blogsByTopic
            }

        } catch (error: any) {
            return {
                message: error.message
            }
        }
    }
}