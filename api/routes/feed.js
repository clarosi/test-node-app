const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();

const feedController = require("../controllers/feed");

router.get('/post/:postId', feedController.getPost);

router.get("/posts", feedController.getPosts);

router.delete('/post/:postId', feedController.deletePost);

router.put('/post/:postId', 
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updatePost
);

router.post(
  "/post",
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);

module.exports = router;
