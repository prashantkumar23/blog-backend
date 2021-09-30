import { Resolver, Query, ObjectType, Field, Arg, InputType } from "type-graphql";
import UserModel from "../../../models/User";

@ObjectType()
class UserInformation3 {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    image: string;

    @Field({ nullable: true })
    bio: string;
}

@ObjectType()
class GetUserInfoFromNameResponse {
    @Field(() => UserInformation3, { nullable: true })
    user?: UserInformation3

    @Field()
    message?: string;
}

@InputType()
class GetUserInfoFromNameInput {
    @Field()
    name: string
}


@Resolver()
export class GetUserInfoFromNameResolver {
    @Query(() => GetUserInfoFromNameResponse, { nullable: true })
    async getUserInfoFromName(
        @Arg('name') { name }: GetUserInfoFromNameInput
    ): Promise<GetUserInfoFromNameResponse | null> {
        try {
            return await UserModel
                .findOne({ name })
                .select("id name image bio")
                .then((user: UserInformation3) => {
                    return {
                        user
                    }
                })


        } catch (error: any) {
            return {
                message: error.message
            }
        }
    }
}
