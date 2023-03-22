const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Pattern = require("../models/Pattern");
const Counter = require("../models/Counter");

module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id });
            res.render("profile.ejs", { posts: posts, user: req.user });
        } catch (err) {
            console.log(err)
        }
    },
    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdA: "desc" }).lean();
            res.render("feed.ejs", {posts: posts });
        } catch (err) {
            console.log(err)
        }
    },
    getPost: async (req, res) => {
        try { 
          const post = await Post.findById(req.params.id);
          const comments = await Comment.find({post: req.params.id }).sort({ createdAt: "desc" }).lean();
          const pattern = await Pattern.find({post: req.params.id }).lean();
          const counters = await Counter.find({post: req.params.id }).lean();
          const user = await User.find({ user: req.params.user })
          const postAuthor = await User.findById(post.user).lean();
          res.render("post.ejs", { post: post, user: req.user, comments: comments, pattern: pattern, counters: counters, users: user, postAuthor: postAuthor.userName});
        } catch (err) {
          console.log(err);
        }
    },
    createPost: async (req, res) => {
        try {
          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
    
          await Post.create({
            title: req.body.title,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            description: req.body.description,
            likes: 0,
            user: req.user.id,
            origin: req.body.origin,
            craft: req.body.craft,
            category: req.body.category,
            yarn: req.body.yarn,
            yarnWeight: req.body.yarnWeight,
            gauge: req.body.gauge,
            needleSize: req.body.needleSize,
            yardage: req.body.yardage,
            size: req.body.size,
          });
          console.log("Post has been added!");
          res.redirect("/profile");
        } catch (err) {
          console.log(err);
        }
      },
      // get edit Post
      getEditPost: async (req, res) => {
        try { 
          const post = await Post.findById(req.params.id).lean();
          const comments = await Comment.find({post: req.params.id }).sort({ createdAt: "desc" }).lean();
          const pattern = await Pattern.find({post: req.params.id }).lean();
          const counters = await Counter.find({post: req.params.id }).lean();
          const user = await User.find({ user: req.params.user })
          const postAuthor = await User.findById(post.user)
          res.render("editPost.ejs", { post: post, user: req.user, comments: comments, pattern: pattern, counters: counters, users: user, postAuthor: postAuthor.userName});
        } catch (err) {
          console.log(err);
        }
        
      },
      // edit post details
      editPostDetails: async (req, res) => {
        try {
          await Post.findOneAndUpdate(
            {_id: req.params.id },
            {
              $set: {
                title: req.body.editTitle,
                description: req.body.editDescription,
                craft: req.body.editCraft,
                yarnWeight: req.body.editYarnWeight,
                needleSize: req.body.editNeedleSize,
                gauge: req.body.editGauge,
                yardage: req.body.editYardage,
                yarn: req.body.editYarn,
                category: req.body.editCategory,
                size: req.body.editSize,
                origin: req.body.editOrigin,
              }
            },
            {new: true}
          );
          console.log("Post Details have been updated!");
          res.redirect(`/post/editPost/${req.params.id}`)
        }
        catch (err) {
          console.log(err);
        }
      },
      // Update Image
      updateImageUpload: async (req, res) => {
        try {     
          // Upload new image to cloudinary 
          const post = await Post.findById(req.params.id).lean();       
          const result = await cloudinary.uploader.upload(req.file.path, options = { public_id: post.cloudinaryId });

          await Post.findOneAndUpdate(
            {_id: req.params.id },
            {
              $set: {
                image: result.secure_url,
              } 
            },
            {new: true}
            );
          console.log("Image has been updated!");
          res.redirect(`/post/editPost/${req.params.id}`)
        }
        catch (err) {
          console.log(err);
        }
      },
      likePost: async (req, res) => {
        try {
          await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
            }
          );
          console.log("Likes +1");
          res.redirect(`/post/${req.params.id}`);
        } catch (err) {
          console.log(err);
        }
      },
      deletePost: async (req, res) => {
        try {
          // Find post by id
          let post = await Post.findById({ _id: req.params.id });
          // Delete image from cloudinary
          await cloudinary.uploader.destroy(post.cloudinaryId);
          // Delete post from db
          await Post.remove({ _id: req.params.id });
          console.log("Deleted Post");
          res.redirect("/profile");
        } catch (err) {
          res.redirect("/profile");
        }
      },
} 