const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");


module.exports = {

    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
                user: req.user.id,
                userName: req.user.userName,              
            });
            console.log("Comment has been added!");
            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },

    likeComment: async (req, res) => {
        try {
            const comment = await Comment.findOne({ _id: req.params.id });
            await Comment.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                }
            );
            console.log("Comment Likes +1");
            res.redirect(`/post/${comment.post}`);
        } catch (err) {
            console.log(err);
        }
    },
    deleteComment: async (req, res ) => {
        try {
            const comment = await Comment.findOne({ _id: req.params.id });
            await Comment.remove({ _id: req.params.id });
            console.log("Deleted Comment");
            res.redirect(`/post/${comment.post}`);
        } catch (err) {
            res.redirect(`/post/${comment.post}`);
        }
    },
};