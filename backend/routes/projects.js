const router = require("express").Router()
const auth = require("../middleware/auth")
const User = require("../models/User.js")
let Project = require("../models/Project.js")

router.get("/", async (req, res) => {
  const projects = await Project.find({ userId: req.userId })
  res.json(projects)
})

router.post("/create", auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user })
    const userId = user.id
    const { title, description, steps } = req.body

    const newProject = new Project({
      title,
      description,
      steps,
      userId
    })
    const savedProject = await newProject.save()
    res.json(savedProject)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }

  // newProject.save().then(() => res.json("Project added!").catch(err => res.status(400).json("Error: " + err)))
})

router.route("/:id").get((req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json("Error: " + err))
})

router.delete("/:id", auth, async (req, res) => {
  const project = await Project.findOne({ userId: req.user, _id: req.params.id })
  if (!project)
    return res.status(400).json({
      msg: "No todo found with this ID that belongs to the currently logged in user."
    })

  const deletedProject = await Project.findByIdAndDelete(req.params.id)
  res.json(deletedProject)
})

router.route("/update/:id").post((req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      project.title = req.body.title
      project.description = req.body.description
      project.duration = Number(req.body.duration)
      project.date = Date.parse(req.body.date)

      project
        .save()
        .then(() => res.json("Project Updated!"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router
