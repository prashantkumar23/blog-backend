import createError from 'http-errors'
import { Field, InputType, Arg, Resolver, ObjectType, Mutation } from 'type-graphql';
import UserModel from '../../models/User';
const cloudinary = require('cloudinary').v2

@InputType()
class ImageUploadInput {
    @Field()
    photo: string

    @Field()
    username: string

}


@Resolver()
export class ImageUploadResolver {
    @Mutation(() => ImageUploadResponse)
    async imageUpload(@Arg('imageUploadInput') { photo, username }: ImageUploadInput): Promise<ImageUploadResponse> {

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const result = await cloudinary.uploader.upload(photo, {
            allowed_formats: ["jpg", "png"],
            public_id: "",
            folder: "test",
        })

        if (result.secure_url) {
            return await UserModel.findOneAndUpdate({ username }, { imageUrl: result.secure_url }).then(() => {
                return {
                    status: true,
                    message: "Uploaded Succesfully",
                    url: result.secure_url
                }
            })
        } else {
            return {
                status: false,
                message: "Image upload fail",
            }
        }

    }
    catch(error: any) {
        return {
            status: true,
            message: error.message
        }
    }


}


@ObjectType()
export class ImageUploadResponse {
    @Field(() => Boolean)
    status?: boolean;

    @Field(() => String)
    message?: string;

    @Field()
    url?: string;
}

