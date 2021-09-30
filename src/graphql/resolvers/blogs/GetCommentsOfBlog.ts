import { Query, Resolver, InputType, Field, ObjectType, Arg } from "type-graphql";
import BlogModel from '../../../models/Blog';

@InputType()
class GetCommentsOfBlogInput {
    @Field()
    blogId: string
}

@ObjectType()
class CommentedUserOnThatBlog {
    @Field(() => String)
    _id: string

    @Field()
    name: string;

    @Field()
    image: string;
}

@ObjectType()
class BlogComment {
    @Field()
    _id: string

    @Field()
    comment: string;

    @Field(() => CommentedUserOnThatBlog)
    user: CommentedUserOnThatBlog

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

}

@ObjectType()
class NextCommentsParams {
    @Field()
    pageNumber: number

    @Field()
    nPerPage: number
}

@ObjectType()
class BlogComments {
    @Field()
    _id: string;

    @Field(() => [BlogComment], { nullable: true })
    comments?: [BlogComment]
}


@ObjectType()
class GetCommentsOfBlogResponse {
    @Field({ nullable: true })
    count?: number

    @Field(() => NextCommentsParams, { nullable: true })
    next?: NextCommentsParams

    @Field({ nullable: true })
    prevoius?: string;

    @Field(() => BlogComments, { nullable: true })
    blogComments: BlogComments | null

    @Field(() => String, { nullable: true })
    message?: string;
}

@Resolver()
export class GetCommentsOfBlogResolver {
    @Query(() => GetCommentsOfBlogResponse)
    async getCommentsOfBlog(
        @Arg('blogId') { blogId }: GetCommentsOfBlogInput
    ): Promise<GetCommentsOfBlogResponse> {
        try {

            const CommentsCursor = await BlogModel.find({ _id: blogId })
                .select('comments')
                .populate({
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'user',
                        model: 'User',
                        select: '-password -createdAt -updatedAt -__v -bio'
                    },
                    options: {
                        sort: {
                            createdAt: -1
                        }
                    }
                })

            // if (CommentsCursor[0].comments.length === 0) {
            //     return {
            //         count: undefined,
            //         next: undefined,
            //         prevoius: '',
            //         blogComments: null
            //     }
            // }

            return {
                blogComments: CommentsCursor[0]
            }

        } catch (error) {
            return { blogComments: null, message: 'Not Found' }
        }
    }
}