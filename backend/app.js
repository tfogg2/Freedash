const express = require("express")
const app = express()
const sanitizeHTML = require("sanitize-html")
const jwt = require("jsonwebtoken")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use("/users", require("./routes/users"))

app.use("/projects", require("./routes/projects"))

app.use("/share", require("./routes/shares"))



const server = require("http").createServer(app)

module.exports = server
