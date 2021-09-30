import { Context } from '../../models/Context';
import { Field, Arg, Ctx, Query, Resolver, ObjectType, InputType, UseMiddleware } from 'type-graphql';
import createError from 'http-errors';
import { isAuthenticated } from '../../middlewares/isAuthenticated';

// @InputType()
// class DashboardInput {
//     @Field()
//     //@ts-ignore
//     refreshToken: string

//     message?: string
// }

@Resolver()
export class DashboardResolver {

    @Query(() => DashboardResponse)
    @UseMiddleware(isAuthenticated)
    async dashboard(
        // @Arg('dashboardInput') { message }: DashboardInput,
        // @Ctx() ctx: Context
    ): Promise<DashboardResponse> {

        try {

            console.log('Dashboard')

            return {
                status: true,
                message: 'Dashboard'
            }

        } catch (error) {

            return {
                status: false,
                message: createError.InternalServerError()
            }
        }
    }
}


@ObjectType()
export class DashboardResponse {

    @Field(() => Boolean, { nullable: true })
    status: boolean;

    @Field(() => String, { nullable: true })
    message: string;

}

