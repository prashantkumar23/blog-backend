import { Resolver, InputType, Field, ObjectType, Arg, Mutation } from "type-graphql";
import BlogModel from '../../../models/Blog';
import createErrors from 'http-errors';

@InputType()
class CreateBlogInput {
    @Field()
    userId: string;

    @Field()
    title: string

    @Field()
    body: string

    @Field()
    blogImageUrl: string

    @Field(() => [String])
    tags: [string]
}


@ObjectType()
class CreateBlogResponse {
    @Field()
    status?: boolean

    @Field()
    message?: string;
}

@Resolver()
export class CreateBlogResolver {
    // @UseMiddleware(isAuthenticated)
    @Mutation(() => CreateBlogResponse)
    async createBlog(
        @Arg('createBlogInput') { userId, title, body, tags, blogImageUrl }: CreateBlogInput
    ): Promise<CreateBlogResponse> {
        try {
            // const user = ctx.req.body.aud;
            // console.log('User ', user);

            await BlogModel.create({
                user: userId,
                title,
                body,
                tags,
                blogImageUrl
            })

            return {
                status: true,
                message: "Blog Published!"
            }
        } catch (error: any) {
            return { status: false, message: error?.message }
        }
    }
}