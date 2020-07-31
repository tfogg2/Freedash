const User = require("../models/User")

// exports.doesUsernameExist = function (req, res) {
//   User.findByUsername(req.body.username.toLowerCase())
//     .then(function () {
//       res.json(true)
//     })
//     .catch(function (e) {
//       res.json(false)
//     })
// }

// exports.doesEmailExist = async function (req, res) {
//   let emailBool = await User.doesEmailExist(req.body.email)
//   res.json(emailBool)
// }

exports.doesUsernameExist = function (req, res) {
  User.findByUsername(req.body.username.toLowerCase())
    .then(function () {
      res.json(true)
    })
    .catch(function (e) {
      res.json(false)
    })
}

const users = User.find()

exports.doesEmailExist = async function (req, res) {
  let user = await users.findOne({ email: req.body.email })
  res.json(user)
}

exports.ifUserExists = function (req, res, next) {
  User.findByUsername(req.params.username)
    .then(function (userDocument) {
      req.profileUser = userDocument
      next()
    })
    .catch(function (e) {
      res.json(false)
    })
}

exports.apiLogin = function (req, res) {
  let user = new User(req.body)
  user
    .login()
    .then(function (result) {
      res.json({
        token: jwt.sign({ _id: user.data._id, username: user.data.username, avatar: user.avatar }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        username: user.data.username,
        avatar: user.avatar
      })
    })
    .catch(function (e) {
      res.json(false)
    })
}
