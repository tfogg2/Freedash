const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  steps: { type: Array }
})

module.exports = Project = mongoose.model("Project", ProjectSchema)
