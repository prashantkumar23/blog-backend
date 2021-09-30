import { Arg, Field, InputType, Mutation, ObjectType, Resolver, UseMiddleware } from "type-graphql";
import CommentModel from "../../../models/Comment";
import mongoose from 'mongoose'
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

@InputType()
class UpdateCommentInput {
    @Field()
    commentId?: string;

    @Field()
    commentBody?: string;
}


@ObjectType()
class Comment {
    @Field()
    id?: string;

    @Field()
    comment?: string;
}

@ObjectType()
class UpdateCommentResponse {

    @Field(() => Comment, { nullable: true })
    comment?: Comment

    @Field()
    status?: boolean

    @Field()
    message?: string;
}

@Resolver()
export class UpdateCommentResolver {
    // @UseMiddleware(isAuthenticated)
    @Mutation(() => UpdateCommentResponse)
    async updateComment(
        @Arg('updateCommentInput') { commentId, commentBody }: UpdateCommentInput
    ): Promise<UpdateCommentResponse> {
        try {
            return CommentModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(commentId) }, { comment: commentBody }, { new: true }).then(
                (blogInfo: any) => {
                    console.log(blogInfo)
                    return {
                        comment: blogInfo,
                        status: true,
                        message: 'Comment updated'
                    };
                }
            );
        }
        catch (e: any) {
            return {

                status: false,
                message: e.message
            }
        }
    }
}