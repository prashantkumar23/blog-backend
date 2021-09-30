import { Query, Resolver, InputType, Field, ObjectType, Arg } from "type-graphql";
import BlogModel from '../../../models/Blog';

@InputType()
class GetBlogInput {
    @Field()
    blogId: string
}

@ObjectType()
class UserCreated {
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    image: string;
}


@ObjectType()
class Blog {
    @Field()
    _id: string;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field()
    blogImageUrl: string;

    @Field(() => UserCreated)
    user: UserCreated

    @Field(() => [String], { nullable: true })
    tags: [string];
}


@ObjectType()
class GetBlogResponse {
    @Field(() => Blog, { nullable: true })
    blog: Blog | null

    @Field(() => String, { nullable: true })
    message?: string;
}

@Resolver()
export class GetBlogResolver {
    @Query(() => GetBlogResponse)
    async getBlog(
        @Arg('blogId') { blogId }: GetBlogInput
    ): Promise<GetBlogResponse> {
        try {
            return BlogModel
                .findOne({ _id: blogId })
                .select('-comments')
                .populate({
                    path: 'user',
                    model: 'User',
                    select: '-password -createdAt -updatedAt -__v -bio',
                })
                .then((blog) => {
                    return {
                        blog
                    }
                })
        } catch (error) {
            return { blog: null, message: 'Not Found' }
        }
    }
}