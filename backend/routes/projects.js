const router = require("express").Router()
const auth = require("../middleware/auth")
const User = require("../models/User.js")
let Project = require("../models/Project.js")
let Step = require("../models/Step.js")

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user)
    const userId = user.id
    const token = req.header("freedashToken")
    const projects = await Project.find({ userId })
    res.json(projects)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
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

router.get("/:id/steps/", auth, async (req, res) => {
  try {
    // const user = await User.findById(req.user)
    // const userId = user.id
    const token = req.header("freedashToken")
    const projectId = req.params.id
    console.log(token)
    console.log(projectId)
    const steps = await Step.find({ projectId: projectId })
    res.json(steps)
    console.log(steps)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post("/:id/steps/create", auth, async (req, res) => {
  try {
    const { name, duration, projectId, userId, isCompleted } = req.body
    console.log([name, duration, projectId, userId])
    const newStep = new Step({
      name,
      duration,
      isCompleted,
      userId,
      projectId
    })
    const savedStep = await newStep.save()
    Project.findById(projectId).then(project => {
      project.steps.push(savedStep)
      project.save()
        .then(() => res.json(project))
        .catch(err => res.status(400).json("Error: " + err))
    })
      .catch(err => res.status(400).json("Error: " + err))

  } catch (e) {
    res.status(500).json({ error: e.message })
  }

  // newProject.save().then(() => res.json("Project added!").catch(err => res.status(400).json("Error: " + err)))
})

// router.route("/:id").get((req, res) => {
//   Project.findById(req.params.id)
//     .then(project => {
//       res.json(project)
//     })
//     .catch(err => res.status(400).json("Error: " + err))
// })

router.post("/:id/edit/:id", auth, async (req, res) => {
  const { projectId } = req.body
  // Step.find({ projectId }).then(steps => {

  //   steps.save()
  // })
  const steps = await Step.find({ projectId })

  Step.findById(req.body.id).then(step => {
    // steps.splice(steps.indexOf({ _id: req.body.id }), 1)
    step.name = req.body.name
    step.duration = req.body.duration
    step.isCompleted = req.body.isCompleted

    step
      .save()
      .then(() => {
        res.json(step)
        console.log(step)
      })
      .catch(err => res.status(400).json("Error: " + err))
  })
    .catch(err => res.status(400).json("Error: " + err))
})

router.get("/:id", auth, async (req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      res.json(project)
    })
    .catch(err => res.status(400).json("Error: " + err))
})

router.delete("/:id", auth, async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id })
  if (!project)
    return res.status(400).json({
      msg: "No project found with this ID that belongs to the currently logged in user."
    })

  const deletedProject = await Project.findByIdAndDelete(req.params.id)
  res.json(deletedProject)
})

router.post("/:id/edit", auth, async (req, res) => {
  // const token = req.header("freedashToken")
  // const projects = await Project.find(req.body.userId)
  // const projectCount = projects.length
  Project.findById(req.params.id)
    .then(project => {
      if (req.body.title) {
        project.title = req.body.title
      } else {
        project.title = "untitled"
      }

      project.description = req.body.description

      project.steps = req.body.steps



      project
        .save()
        .then(() => res.json(project))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err))
})

router.route("/update/:id").post((req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      if (project.title) {
        project.title = req.body.title
      }

      project.description = req.body.description

      project
        .save()
        .then(() => res.json(project))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router
