const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'Kindly enter the author of comment'
  },
  text: {
    type: String,
    required: 'Kindly enter the text of comment'
  },
  date: {
    type: Date,
    default: Date.now
  },
  stars: {
    type: Number,
    required: 'Kindly enter the stars to comment',
    min: 1,
    max: 5
  }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = {
  Comment
}
