const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
// const usersCollection = require("../db").collection("users")
const validator = require("validator")

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String }
})

module.exports = User = mongoose.model("User", UserSchema)
