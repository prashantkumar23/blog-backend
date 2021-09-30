import { Resolver, InputType, Field, ObjectType, Arg, Mutation, UseMiddleware } from "type-graphql";
import BlogModel from '../../../models/Blog';
import mongoose, { Error } from 'mongoose';
import createErrors from 'http-errors';
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

@InputType()
class UpdateBlogInput {

    @Field()
    //@ts-ignore
    _id: string

    @Field()
    title?: string

    @Field()
    body?: string

}


@ObjectType()
class UpdateBlogResponse {
    @Field()
    status?: boolean

    @Field()
    message?: string;
}

@Resolver()
export class UpdateBlogResolver {
    @UseMiddleware(isAuthenticated)
    @Mutation(() => UpdateBlogResponse)
    async updateBlog(
        @Arg('updateBlogInput') { _id, title, body }: UpdateBlogInput
    ): Promise<UpdateBlogResponse | undefined> {
        try {
            return BlogModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) },
                { title, body },
                { new: true })
                .then(
                    (blogInfo: any) => {
                        console.log(blogInfo);
                        return {
                            status: true,
                            message: "Updated Succesfully"
                        };
                    }
                );
        } catch (error: any) {
            return { status: false, message: error.message }
        }
    }
}