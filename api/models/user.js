const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
      type: String,
      required: true,
      minlength: 5
  },
  password: {
      type: String,
      required: true,
      minlength: 5
  },
  name: {
      type: String,
      required: true
  },
  status: {
      type: String,
      required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
}, 
{timestamps: true}
);

module.exports = mongoose.model('User', userSchema);