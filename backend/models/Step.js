const mongoose = require("mongoose")

const StepSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  projectId: { type: String, required: true },
  name: { type: String },
  duration: { type: Number }
})

module.exports = Step = mongoose.model("Step", StepSchema)
