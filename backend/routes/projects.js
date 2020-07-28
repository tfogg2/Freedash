const router = require("express").Router()
let Project = require("../models/Project.js")

router.route("/").get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route("/create").post((req, res) => {
  const owner = req.body.owner
  const title = req.body.title
  const description = req.body.description
  const steps = req.body.steps
  const date = Date.parse(req.body.date)

  const newProject = new Project({
    owner,
    title,
    description,
    steps,
    date
  })

  newProject.save().then(() => res.json("Project added!").catch(err => res.status(400).json("Error: " + err)))
})

router.route("/:id").get((req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route("/:id").delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route("/update/:id").post((req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      project.username = req.body.username
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
