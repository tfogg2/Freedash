const router = require("express").Router()
const auth = require("../middleware/auth")
const User = require("../models/User.js")
let Project = require("../models/Project.js")
let Step = require("../models/Step.js")
const jwt = require("jsonwebtoken")
const e = require("express")

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

})

router.get("/:id/steps/", auth, async (req, res) => {
  try {
    const token = req.header("freedashToken")
    const projectId = req.params.id
    const steps = await Step.find({ projectId: projectId })
    res.json(steps)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: e.message })

  }
})

router.post("/:id/link", auth, async (req, res) => {
  try {
    const urlToken = jwt.sign({ projectId: req.params.id }, process.env.JWT_SHARESECRET, { expiresIn: '30d' })
    res.json(urlToken)
    console.log(urlToken)
  } catch (e) {
    res.status(500).json({ error: e.message })
    console.log(e.message)
  }
})

router.get("/:id/steps/progress", auth, async (req, res) => {
  try {
    const projectId = req.params.id
    const steps = await Step.find({ projectId: projectId })
    let totalDuration = 0
    for (i = 0; i < steps.length; i++) {
      const step = steps[i]
      const duration = step.duration
      function total() {
        totalDuration += duration
      }
      total()
    }
    res.json(totalDuration)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get("/:id/steps/completed", auth, async (req, res) => {
  try {

    const projectId = req.params.id
    const steps = await Step.find({ projectId: projectId })
    let totalDuration = 0
    for (i = 0; i < steps.length; i++) {
      const step = steps[i]
      if (step.isCompleted) {
        const duration = step.duration
        function total() {
          totalDuration += duration
        }
        total()
      } else {
        totalDuration += 0
      }
    }
    res.json(totalDuration)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post("/:id/steps/create", auth, async (req, res) => {
  try {
    const { name, duration, projectId, userId, isCompleted } = req.body
    const newStep = new Step({
      name,
      duration,
      isCompleted,
      userId,
      projectId
    })
    const savedStep = await newStep.save()
    Project.findById(req.params.id).then(project => {
      project.steps.push(savedStep)
      project.save()
        .then(() => res.json(project))
        .catch(err => res.status(400).json("Error: " + err))
    })
      .catch(err => res.status(400).json("Error: " + err))

  } catch (e) {
    res.status(500).json({ error: e.message })
  }

})



router.post("/:id/steps/edit/:id", auth, async (req, res) => {
  const { projectId, name, duration, isCompleted } = req.body
  const savedStep = Step.findById(req.body.id).then(step => {
    step.name = name
    step.duration = duration
    step.isCompleted = isCompleted
    step.save().then(() => res.json(step))
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

router.delete("/:id/steps/:id", auth, async (req, res) => {
  const step = await Step.findOne({ _id: req.params.id })
  if (!step)
    return res.status(400).json({
      msg: "No step found with this ID that belongs to the currently logged in user."
    })

  const deletedStep = await Step.findByIdAndDelete(req.params.id)
  res.json(deletedStep)
})



router.post("/:id/edit", auth, async (req, res) => {

  Project.findById(req.params.id)
    .then(project => {
      project.title = req.body.title
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
