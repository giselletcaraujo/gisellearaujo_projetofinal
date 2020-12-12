const mongoose = require("mongoose")

const communitiesSchema = new mongoose.Schema({
    id : { type : Number},
    name: { type : String },
    genre: { type : String },
    city: { type : String },
    numStudents: { type : Number},
    numArtifact: { type : Number},
    received: { type : Boolean},
},{
    versionKey: false
})

const communities = new mongoose.model("communities", communitiesSchema)

module.exports = communities