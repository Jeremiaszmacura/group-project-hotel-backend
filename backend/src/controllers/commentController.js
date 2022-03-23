const getAll = (req, res) => {
  return res.json('getAll')
}

const createComment = (req, res) => {
  return res.json('createComment')
}

const updateComment = (req, res) => {
  return res.json('updateComment')
}

const removeComment = (req, res) => {
  return res.json('removeComment')
}

module.exports = {
  getAll,
  createComment,
  updateComment,
  removeComment
}
