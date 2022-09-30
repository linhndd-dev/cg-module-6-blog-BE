const Post = require("../models/Post");

const postController = {
    getAllPostByIdUser: async(req, res) => {
        try {
            let id = req.params.id;
            let posts = await Post.find({author: id})
            res.status(200).json(posts);
        }catch {
            res.status(404).json();
        }
    },

    createPost: async(req, res) => {
        try {
            let post = req.body;
            let id = req.params.id
            post.author = id;
            await Post.create(post);
            res.status(200).json(post);
        }catch (err) {
            res.status(404).json();
        }
    }    
}

module.exports = postController;