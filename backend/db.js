const dotenv = require("dotenv")
dotenv.config()
const mongodb = require("mongodb")

mongodb.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.log(err)
  }

  const app = require("./app")
  app.listen(process.env.PORT)
  module.exports = client
})
