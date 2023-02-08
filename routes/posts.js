const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const Comment = require('../models/comment')

// fetch all documents from the "Post" collection in the MongoDB database, and sort them
router.get('/', async (req, res, next) => {
    // sort from the latest to the earliest
    const posts = await Post.find().sort({ createdAt: 'desc' });
    return res.status(200).json({
      statusCode: 200,
      message: 'Fetched all posts',
      data: { posts },
    });
  });

router.get('/:id',async(req,res,next)=>{
    // req.params contains the route parameters and the id is one of them
  const post = await Post.findById(req.params.id);
  return res.status(200).json({
    statusCode: 200,
    message: 'Fetched post',
    data: {
      post: post || {},
    },
  });
})
// viewing comments on a post
router.get("/posts/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id });
    res.send({ comments });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
/* POST post */
router.post('/', async (req, res, next) => {
    const { title, author, content, tags } = req.body;
  
    // Create a new post
    const post = new Post({
      title,
      author,
      content,
      tags,
    });
  
    // Save the post into the DB
    await post.save();
    return res.status(201).json({
      statusCode: 201,
      message: 'Created post',
      data: { post },
    });
  });
// posting new comments on a post
  router.post("/posts/:id/comments", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = new Comment({
        author: req.body.author,
        content: req.body.content,
        post: post._id
      });
      await comment.save();
      post.comments.push(comment._id);
      await post.save();
      res.status(201).send({ comment });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

/* PUT post */
router.put('/:id', async (req, res, next) => {
    const { title, author, content, tags } = req.body;
  
    // findByIdAndUpdate accepts the post id as the first parameter and the new values as the second parameter
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, author, content, tags },
    );
    
    return res.status(200).json({
      statusCode: 200,
      message: 'Updated post',
      data: { post },
    });
  });
  
  /* DELETE post */
router.delete('/:id', async (req, res, next) => {
   // Mongo stores the id as `_id` by default
    const result = await Post.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      statusCode: 200,
      message: `Deleted ${result.deletedCount} post(s)`,
      data: {},
    });
  });
  
  
  module.exports = router;