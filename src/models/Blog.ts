import mongoose, { Schema } from 'mongoose'
require('./Comment');


export interface Blog {
    title: string;
    body: string;
    blogImageUrl: string;
    comments: [mongoose.Schema.Types.ObjectId],
    tags: [string] | undefined;
    user: mongoose.Types.ObjectId
}

const schema = new Schema<Blog>({
    title: { type: String, required: true, minlength: 10 },
    body: { type: String, required: true },
    blogImageUrl: { type: String, required: false },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    tags: { type: [String], default: null, required: true, maxlength: 4, minlength: 1 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true,
})

const BlogModel = mongoose.model('Blog', schema);
export default BlogModel;
