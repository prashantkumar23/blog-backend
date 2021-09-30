import { Query, Resolver, Field, ObjectType } from "type-graphql";
import { TOPICS } from '../../../helpers/topics';


@ObjectType()
class Topic {
    @Field()
    topicName: string;

    @Field()
    topicDescription: string

    @Field()
    topicColorCode: string;
}

@ObjectType()
class GetAllTopicsResponse {
    @Field(() => [Topic])
    topics?: Topic[]

    @Field()
    message?: string
}

@Resolver()
export class GetAllTopicsResolver {
    @Query(() => GetAllTopicsResponse)
    async getAllTopics(
    ): Promise<GetAllTopicsResponse> {
        try {

            return await {
                topics: TOPICS
            }

        } catch (error: any) {
            return {
                message: error.message
            }
        }
    }
}