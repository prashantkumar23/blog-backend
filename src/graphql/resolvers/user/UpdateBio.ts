import { Resolver, ObjectType, Field, Arg, Mutation, InputType } from "type-graphql";
import UserModel from "../../../models/User";

@ObjectType()
class UpdateBioResponse {
    @Field({ nullable: true })
    bio?: string

    @Field()
    message?: string;
}

@InputType()
class UpdateBioInput {
    @Field()
    userId: string;

    @Field()
    bio: string;
}

@Resolver()
export class UpdateBioResolver {

    @Mutation(() => UpdateBioResponse, { nullable: true })
    async updateBio(
        @Arg('updateBioInput') { userId, bio }: UpdateBioInput
    ): Promise<UpdateBioResponse> {
        try {
            return await UserModel
                .findOneAndUpdate({ _id: userId }, {
                    bio
                }, {
                    new: true
                })
                .select('bio')
                .then((newUser: any) => {
                    return {
                        bio: newUser.bio,
                        message: "Bio updated!"
                    }
                })


        } catch (error: any) {
            return {
                message: error.message
            }
        }
    }
}
