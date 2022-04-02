const { Comment } = require('../models/comment')

const getAll = (req, res) => {
  Comment.find({}, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data.length) {
      return res.status(404).json('No comments in database')
    }
    return res.status(200).json(data)
  })
}

const createComment = (req, res) => {
  req.body.author = req.user._id
  const comment = new Comment(req.body)
  comment.save()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json('something went wrong')
    })
}

const updateComment = (req, res) => {
  Comment.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json('No comment in database')
    }
    for (const field in req.body) {
      data[field] = req.body[field]
    }
    data.save()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json('something went wrong')
      })
  })
}

const removeComment = (req, res) => {
  Comment.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).json('something went wrong')
    }
    if (!data) {
      return res.status(404).json('No comment in database')
    }
    data.remove()
    return res.status(200).json('Comment deleted')
  })
}

module.exports = {
  getAll,
  createComment,
  updateComment,
  removeComment
}
