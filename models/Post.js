const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: String,
}, {
  timestamps: true,
});

module.exports = model('Post', PostSchema);
