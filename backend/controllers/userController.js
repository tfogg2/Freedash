// const User = require("../models/User")

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
