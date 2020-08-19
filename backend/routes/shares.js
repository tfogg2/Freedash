const router = require("express").Router()
const authUrl = require("../middleware/authUrl")
const User = require("../models/User.js")
let Project = require("../models/Project.js")
let Step = require("../models/Step.js")



router.get("/:id/:token", authUrl, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    res.json(project)
  } catch (e) {
    res.status(500).json({ error: e.message })
    console.log(e.message)
  }
})

router.get("/:id/:token/steps/progress", authUrl, async (req, res) => {
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

router.get("/:id/:token/steps/completed", authUrl, async (req, res) => {
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




module.exports = router