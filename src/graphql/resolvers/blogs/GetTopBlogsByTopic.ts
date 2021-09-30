import { Query, Resolver, Field, ObjectType, InputType, Arg } from "type-graphql";
import BlogModel from '../../../models/Blog';

@ObjectType()
class UserAssociated {
    @Field()
    _id: string

    @Field()
    name: string;

    @Field()
    image: string;
}

@ObjectType()
class TopBlogs {
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

    @Field(() => UserAssociated)
    user: UserAssociated
}


@ObjectType()
class GetTopBlogsByTopicResponse {

    @Field(() => [TopBlogs], { nullable: true })
    blogs?: [TopBlogs]

    @Field(() => String, { nullable: true })
    message?: string;
}

@InputType()
class GetTopBlogsByTopicInput {
    @Field()
    topic: string
}

@Resolver()
export class GetTopBlogsByTopicResolver {
    @Query(() => GetTopBlogsByTopicResponse)
    async getTopBlogsByTopicResolver(
        @Arg('getTopBlogsByTopicInput') { topic }: GetTopBlogsByTopicInput,
    ): Promise<GetTopBlogsByTopicResponse> {
        try {

            const b = await BlogModel.find({ tags: topic })
                .sort({ createdAt: -1 })
                .select('_id title createdAt blogImageUrl tags')
                .limit(5)
                .populate({
                    path: 'user',
                    model: 'User',
                    select: '_id name image',
                })
            return {
                blogs: b
            }
        } catch (error) {
            return { blogs: undefined, message: 'Not Found' }
        }
    }
}