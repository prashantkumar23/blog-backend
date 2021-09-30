import { Query, Resolver, Field, ObjectType, Arg } from "type-graphql";
import BlogModel from '../../../models/Blog';

@ObjectType()
class GetTopTagsByNumberOfPostResponse {
    @Field({ nullable: true })
    tag: string;
}

@Resolver()
export class GetTopTagsByNumberOfPostResolver {
    @Query(() => [GetTopTagsByNumberOfPostResponse])
    async getTopTagsByNumberOfPost(
    ): Promise<GetTopTagsByNumberOfPostResponse[] | null> {
        try {

            const tagCount = await BlogModel.aggregate([
                { $unwind: "$tags" },
                { $group: { "_id": "$tags", "count": { $sum: 1 } } },
                { $project: { _id: 0, tag: "$_id" } },
                { $sort: { "count": 1 } },
                { $limit: 10 }
            ])

            return tagCount

        } catch (error) {
            return null
        }
    }
}