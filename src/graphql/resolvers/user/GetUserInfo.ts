import mongoose from "mongoose";
import { Resolver, Query, ObjectType, Field, Arg, InputType } from "type-graphql";
import UserModel from "../../../models/User";

@ObjectType()
class UserInformation {
    @Field()
    id: string;

    @Field({ nullable: true })
    bio: string;
}

@ObjectType()
class GetUserInfoResponse {
    @Field(() => UserInformation, { nullable: true })
    user?: UserInformation

    @Field()
    message?: string;
}

@InputType()
class GetUserInfoInput {
    @Field()
    userId: string
}


@Resolver()
export class GetUserInfoResolver {
    @Query(() => GetUserInfoResponse, { nullable: true })
    async getUserInfo(
        @Arg('userId') { userId }: GetUserInfoInput
    ): Promise<GetUserInfoResponse | null> {
        try {
            return await UserModel
                .findOne({ _id: new mongoose.Types.ObjectId(userId) })
                .select("bio")
                .then((user: UserInformation) => {
                    const { bio } = user
                    return {
                        user: {
                            bio,
                        },
                    }
                })


        } catch (error: any) {
            return {
                message: error.message
            }
        }
    }
}
