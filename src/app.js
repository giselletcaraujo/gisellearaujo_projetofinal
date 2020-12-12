const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

mongoose.connect("mongodb://localhost:27017/projetoFinal", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

let db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function (){
  console.log("conexão feita com sucesso.")
})

const communities = require("./routes/communitiesRoute")

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

app.use("/communities", communities)

module.exports = app