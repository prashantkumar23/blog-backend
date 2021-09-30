import mongoose from "mongoose";
import { Resolver, Field, ObjectType, InputType, Arg, Mutation, UseMiddleware } from "type-graphql";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";
import BlogModel from '../../../models/Blog';


@InputType()
class DeleteBlogInput {
    @Field()
    blogId?: string;
}

@ObjectType()
class DeleteBlogResponse {
    @Field()
    message?: string;
}

@Resolver()
export class DeleteBlogResolver {
    @UseMiddleware(isAuthenticated)
    @Mutation(() => DeleteBlogResponse)
    async deleteBlog(
        @Arg('deleteBlogInput') { blogId }: DeleteBlogInput
    ): Promise<DeleteBlogResponse> {
        try {
            return BlogModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(blogId) }).then(() => {
                return {
                    message: 'Deleted Successfully'
                }
            });
        } catch (error) {
            return { message: "Can't be deleted" }
        }
    }
}