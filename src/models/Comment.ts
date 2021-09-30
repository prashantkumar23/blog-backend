import mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model('Comment', CommentSchema);
export default CommentModel;
