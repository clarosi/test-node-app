const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator/check');

const Post = require('../models/feed');
const utils = require('../../shared/utils/functions');

module.exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
  .then(result => {
    if (!result) {
      utils.customError('Could not find post.', 404);
    }
    res.status(200).json({
      message: 'Success',
      post: result
    });
  })
  .catch(err => {
    utils.customCatchError(err, next);
  });
}

module.exports.getPosts = (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Post.find().countDocuments()
  .then(result => {
    totalItems = result;
    return Post.find()
      .skip((curPage - 1) * perPage)
      .limit(perPage);
  })
  .then(result => {
    res.status(200).json({
      totalItems,
      message: 'Success',
      posts: result
    });
  })
  .catch(err => {
    utils.customCatchError(err, next);
  });
};

module.exports.updatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    utils.customError('Validation failed.', 422);
  }

  const postId = req.params.postId;
  let imageUrl = req.body.avatar;
  if (req.file) {
    imageUrl = req.file.path.split("\\").join("/");
  }
  if (!imageUrl) {
    utils.customError('No image provided.', 422);
  }
  Post.findById(postId)
  .then(result => {
    if (!result) {
      utils.customError('Could not find post.', 404);
    }
    if (req.file) {
      removeImage(result.imageUrl);
    }
    result.title = req.body.title;
    result.content = req.body.content;
    result.imageUrl = imageUrl;
    return result.save();
  })
  .then(result => {
    res.status(200).json({
      message: 'Success',
      post: result
    });
  })
  .catch(err => {
    utils.customCatchError(err, next);
  });
}

module.exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
  .then(result => {
    // TODO check user log in
    if (!result) {
      utils.customError('Could not find post.', 404);
    }
    removeImage(result.imageUrl);
    return Post.findByIdAndDelete(postId);
  })
  .then(result => {
    res.status(200).json({message: 'Success'});
  })
  .catch(err => {
    utils.customCatchError(err, next);
  });
}

module.exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    utils.customError('Validation failed.', 422);
  }
  
  if (!req.file) {
    utils.customError('No image provided.', 422);
  }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path.split("\\").join("/");
  const post = new Post({
    title,
    content,
    imageUrl,
    creator: {name: 'Ian R. Claros'}
  });
  post.save()
  .then(result => {
    res.status(201).json({
      post: result,
      message: 'Success'
    })
  })
  .catch(err => {
    utils.customCatchError(err, next);
  });
};

// helper functions
const removeImage = filePath => {
  filePath = path.join(__dirname, '../..', filePath);
  fs.unlink(filePath, err => {
    if (err) {
      console.log(err.message);
    }
  });
}