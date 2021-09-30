import { Resolver, InputType, Field, ObjectType, Arg, Query } from "type-graphql";
import BlogModel from '../../models/Blog';

@InputType()
class SearchInput {
    @Field()
    term: string
}

@ObjectType()
class SearchResult {
    @Field()
    _id: string;

    @Field()
    title: string;
}

@ObjectType()
class SearchResponse {
    @Field()
    status?: boolean

    @Field()
    message?: string;

    @Field(() => [SearchResult], { nullable: true })
    result?: SearchResult[]
}

@Resolver()
export class SearchResolver {
    @Query(() => SearchResponse)
    async search(
        @Arg('createBlogInput') { term }: SearchInput
    ): Promise<SearchResponse> {
        try {
            const result = await BlogModel.aggregate([
                {
                    "$search": {
                        "autocomplete": {
                            "query": term,
                            "path": "title",
                            "fuzzy": {
                                "maxEdits": 1,
                                "prefixLength": 3
                            }
                        }
                    },
                },
                {
                    $limit: 2
                },
                {
                    $project: {
                        "_id": 1,
                        "title": 1,
                    }
                }
            ])
            console.log(result)
            return {
                result
            }
        } catch (error: any) {
            return { status: false, message: error?.message }
        }
    }
}