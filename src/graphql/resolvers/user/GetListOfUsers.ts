import { Resolver, Query, ObjectType, Field } from "type-graphql";
import UserModel from "../../../models/User";

@ObjectType()
class ListOfUsers {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    image: string;
}

@ObjectType()
class GetListOfUsersResponse {
    @Field(() => [ListOfUsers], { nullable: true })
    users?: ListOfUsers[]

    @Field()
    message?: string;
}



@Resolver()
export class GetListOfUsersResolver {
    @Query(() => GetListOfUsersResponse, { nullable: true })
    async getListOfUsers(
    ): Promise<GetListOfUsersResponse | null> {
        try {

            const users = await UserModel
                .find()
                .select("id name image")
                .limit(5)

            return {
                users
            }

        } catch (error: any) {
            return {

                message: error.message
            }
        }
    }
}
