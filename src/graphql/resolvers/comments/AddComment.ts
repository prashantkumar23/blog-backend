import { Arg, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import CommentModel from "../../../models/Comment";
import BlogModel from "../../../models/Blog";
import mongoose from 'mongoose'

@InputType()
class AddCommentInput {
    @Field()
    userId: string;

    @Field()
    commentBody: string;

    @Field()
    blogId: string;
}

@ObjectType()
class AddCommentResponse {
    @Field()
    status?: boolean

    @Field({ nullable: true })
    comment?: string

    @Field()
    message?: string;
}

@Resolver()
export class AddCommentResolver {
    @Mutation(() => AddCommentResponse)
    async addComment(
        @Arg('addCommentInput') { userId, commentBody, blogId }: AddCommentInput
    ): Promise<AddCommentResponse> {
        try {
            let comment: string = ''

            return await CommentModel
                .create({ comment: commentBody, user: userId })
                .then((commentInfo: any) => {
                    comment = commentInfo.comment
                    BlogModel.findOneAndUpdate(
                        {
                            _id: new mongoose.Types.ObjectId(blogId),
                        },
                        { $push: { comments: commentInfo._id } },
                        { new: true }
                    ).populate({
                        path: 'comments',
                        model: 'Comment',
                        populate: {
                            path: 'user',
                            model: 'User',
                        },
                    }).
                        then(() => null)
                })
                .then((data) => {
                    return {
                        status: true,
                        comment,
                        message: 'Comment Added',

                    }
                })
                .catch((err: any) => {
                    console.log(err.message)
                    throw err;
                });
        }
        catch (e: any) {
            return {
                status: false,
                message: e.message
            }
        }
    }
}