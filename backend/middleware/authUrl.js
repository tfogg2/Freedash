const jwt = require("jsonwebtoken")

const authUrl = (req, res, next) => {
  try {
    const token = req.params.token
    console.log(token)
    if (!token) return res.status(401).json({ msg: "No authentication token, authorization denied." })
    const verified = jwt.verify(token, process.env.JWT_SHARESECRET)
    if (!verified) return res.status(401).json({ msg: "Token verification failed, authorization denied" })


    next()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

module.exports = authUrl
