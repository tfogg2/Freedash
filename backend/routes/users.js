const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err))
})

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.user)
  res.json({
    displayName: user.displayName,
    id: user._id
  })
})

router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body

    console.log(email, password, passwordCheck, displayName)

    //validation

    if (!email || !password || !passwordCheck) return res.status(400).json({ body: req.body })

    if (password.length < 5) return res.status(400).json({ msg: "Password needs to be atleast five characters long" })
    if (password !== passwordCheck) return res.status(400).json({ msg: "Enternode a matching password to verify." })

    const existingUser = await User.findOne({ email: email })

    if (existingUser) return res.status(400).json({ msg: "Account with this email already exists." })

    if (!displayName) displayName = email

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    console.log(passwordHash)

    const newUser = new User({
      email,
      password: passwordHash,
      displayName
    })
    console.log(newUser)

    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (err) {
    res.status(500).json("msg: " + "where can I see this " + err)
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ msg: "Not all fields have been entered" })

    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ msg: "No account with this email has been registered" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({
      token,
      user: {
        id: user._id,
        displaName: user.displayName,
        email: user.email
      }
    })
    console.log(token)
  } catch (e) {
    console.log("There was an error: " + e)
  }
})

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.user)
  } catch (e) {
    res.status(500).json({ msg: e })
  }
})

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token")
    if (!token) return res.json(false)

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.json(false)

    const user = await User.findById(verified.id)
    if (!user) return res.json(false)

    return res.json(true)
  } catch (e) {
    res.status(500).json({ msg: "Invalid Credentials" })
  }
})

module.exports = router

// const router = require("express").Router()

// router.route("/").get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json("Error: " + err))
// })

// router.route("/register").post((req, res) => {
//   const username = req.body.username
//   const newUser = new User({ username })
//   newUser.save().then(() => res.json("User added!").catch(err => res.status(400).json("Error: " + err)))
// })

// router.route("/doesUsernameExist").post((req, res) => {
//   userController.doesUsernameExist
// })

// router.route("/doesEmailExist").post((req, res) => {
//   userController.doesEmailExist
// })

// module.exports = router
