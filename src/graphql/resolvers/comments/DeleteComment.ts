import { Arg, Field, InputType, Mutation, ObjectType, Resolver, UseMiddleware } from "type-graphql";
import BlogModel from "../../../models/Blog";
import CommentModel from "../../../models/Comment";
import mongoose from 'mongoose'
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

@InputType()
class DeleteCommentInput {
    @Field()
    blogId: string;

    @Field()
    commentId: string;
}

@ObjectType()
class DeleteCommentResponse {
    @Field()
    status: boolean

    @Field()
    message: string;
}

@Resolver()
export class DeleteCommentResolver {
    // @UseMiddleware(isAuthenticated)
    @Mutation(() => DeleteCommentResponse)
    async deleteComment(
        @Arg('updateCommentInput') { blogId, commentId }: DeleteCommentInput
    ): Promise<DeleteCommentResponse> {
        try {
            return CommentModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(commentId) })
                .then((blogInfo: any) => {

                    BlogModel.findOneAndUpdate(
                        {
                            _id: new mongoose.Types.ObjectId(blogId),
                        },
                        { $pull: { comments: new mongoose.Types.ObjectId(commentId) } },
                        { new: true }
                    ).populate({
                        path: 'comments',
                        model: 'Comment',
                        populate: {
                            path: 'user',
                            model: 'User',
                        },
                    })

                    return {
                        status: true,
                        message: 'Comment Deleted!'
                    }
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