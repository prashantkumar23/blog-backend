import { Resolver, InputType, Field, ObjectType, Arg, Mutation } from "type-graphql";
import BlogModel from '../../../models/Blog';

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
    @Mutation(() => CreateBlogResponse)
    async createBlog(
        @Arg('createBlogInput') { userId, title, body, tags, blogImageUrl }: CreateBlogInput
    ): Promise<CreateBlogResponse> {
        try {

            const newBlog = new BlogModel({
                user: userId,
                title,
                body,
                tags,
                blogImageUrl
            })

            await newBlog.save()

            return {
                status: true,
                message: "Blog published!"
            }


        } catch (error: any) {
            return { status: false, message: error?.message }
        }
    }
}