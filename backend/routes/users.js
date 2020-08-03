const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const userController = require("../controllers/userController")

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err))
})

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.user)
  res.json({
    displayName: user.displayName,
    email: user.email,
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

    if (savedUser) {
      res.json({
        token: jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: tokenLasts }),
        savedUser
      })
    } else {
      res.status(500).json("There was an error.")
    }
  } catch (err) {
    res.status(500).json("msg: " + "where can I see this " + err)
  }
})

router.post("/doesEmailExist", userController.doesEmailExist)

// router.post("/doesEmailExist", async (req, res) => {
//   User.find()
//     .then(users => {
//       console.log(users)
//       let user = users.findOne({ email: req.body.email })
//       if (user) {
//         res.json(true)
//       } else {
//         res.json(false)
//       }
//       // return new Promise(async function (resolve, reject) {
//       //   let user = await users.findOne({ email: req.body.email })
//       //   if (user) {
//       //     resolve(true)
//       //     res.json(true)
//       //   } else {
//       //     resolve(false)
//       //     res.json(false)
//       //   }
//       // })
//       // let emailBool = await User.doesEmailExist(req.body.email)
//       // res.json(emailBool)
//     })
//     .catch(console.log("There was an error."))
// })

// router.post("/doesEmailExist", async (req, res) => {
//   User.find()
//     .then(async users => {
//       const { email } = req.body.email
//       let emailBool = await User.doesEmailExist(users, { email })
//       console.log(emailBool)
//       console.log(email)
//       res.json(emailBool)

//       User.doesEmailExist(users, email)

//       console.log(email)
//       return new Promise(async function (resolve, reject) {
//         if (typeof email != "string") {
//           resolve(false)
//           return
//         }

//         let user = await users.findOne({ email: email })
//         if (user) {
//           resolve(true)
//         } else {
//           resolve(false)
//         }
//       })
//     })
//     .catch(err => res.status(400).json("Error: " + err))
// })

const tokenLasts = "30d"

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ msg: "Not all fields have been entered" })

    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ msg: "No account with this email has been registered" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." })

    res.json({
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: tokenLasts }),
      user: {
        id: user._id,
        displaName: user.displayName,
        email: user.email
      }
    })
  } catch (e) {
    console.log("There was an error: " + e)
  }
})

router.post("/checkToken", async (req, res) => {
  try {
    req.user = jwt.verify(req.body.token, process.env.JWT_SECRET)
    res.json(true)
  } catch (e) {
    res.json(false)
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
    const token = req.header("freedashToken")
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
