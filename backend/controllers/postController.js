import Post from '../models/post.model.js';

// creating a post
export const createPost = async(req, res)=>{
    try{
        const {title, content} = req.body;
        const post = new Post({title, content, author: req.userId});
        await post.save();
        res.status(201).json({message: "Post saved successfully", post});
    }catch(err){
        res.status(500).json({message: "Something went wrong", err});
    }
}

// Get all posts for loggedin user
export const getAllPost = async(req, res)=>{
    try{
        const posts = await Post.find().populate('author', 'username');
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: "Error fetching all post", err});
    }
}

// Get posts of a user
export const getPostsByUser = async (req, res) => {
    try {
      // Extract userId from the authenticated user (JWT token)
      const userId = req.userId;  // Assuming the userId is decoded and set in the token verification middleware
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is missing or invalid' });
      }
  
      // Find posts based on the userId
      const posts = await Post.find({ author: userId }).populate('author', 'username');
      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found for this user' });
      }
      res.status(200).json(posts);
    } catch (err) {
      console.error('Error fetching user posts:', err);
      res.status(500).json({ message: 'Error fetching user posts', error: err.message });
    }
  };

export const getPostById = async(req, res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findById(id).populate('author', 'username');
        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }

        res.status(200).json(post);
    }catch(err){
        res.status(500).json({message: 'Error fetching the post', error: err.message})
    }
}



// update post
export const updatePost = async(req, res)=>{
    try{
        const {id} = req.params;
        const {title, content} = req.body;
        const post = await Post.findByIdAndUpdate({
            _id: id, author: req.userId
        },
        {
            title, content
        },{
            new: true
        });
        if(!post){
            return res.status(404).json({message: "Post not found or you are not authorized"});
        }
        res.status(200).json({message: "Post updated successfully", post});
    }catch(err){
        res.status(500).json({message: "Failed to update post", err});
    }
}

// Delete post
export const deletePost = async(req, res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findByIdAndDelete({_id: id, author: req.userId});
        if(!post) res.status(404).json({message: "Post not found or you are not authorized"});
        res.status(200).json({message: 'Post deleted successfully'});
    }catch(err){
        res.status(500).json({message: "Failed to delete post", err});
    }
}