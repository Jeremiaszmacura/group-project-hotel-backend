const { Comment } = require('../models/comment')

const getAll = (req, res) => {
  Comment.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
    }
    if (!data.length) {
      return res.json('No comments in database')
    }
    return res.json(data)
  })
}

const createComment = (req, res) => {
  req.body.author = req.user._id
  const comment = new Comment(req.body)
  comment.save()
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.log(error)
      return res.json('something went wrong')
    })
}

const updateComment = (req, res) => {
  Comment.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
    }
    if (!data) {
      return res.json('No comment in database')
    }
    for (const field in req.body) {
      data[field] = req.body[field]
    }
    data.save()
      .then((data) => {
        res.json(data)
      })
      .catch((error) => {
        console.log(error)
        return res.json('something went wrong')
      })
  })
}

const removeComment = (req, res) => {
  Comment.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.json('something went wrong')
    }
    if (!data) {
      return res.json('No comment in database')
    }
    data.remove()
    return res.json('Comment deleted')
  })
}

module.exports = {
  getAll,
  createComment,
  updateComment,
  removeComment
}
