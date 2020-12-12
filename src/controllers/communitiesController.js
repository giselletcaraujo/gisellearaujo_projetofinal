const communities = require('../models/communities')

const getAll = (req, res) => {
    communities.find(function (err, communities) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(communities)
        }
    })
}

const getById = (req, res) => {
    const id = req.params.id
    communities.find({ id }, function (err, communities) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(communities)
        }
    })
}

const postCommunity = (req, res) => {
    let community = new communities(req.body)
    
    community.save(function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(201).send({ message : "Comunidade cadastrada com sucesso!"})
        }
    })
}

const deleteCommunity = (req, res) => {
    const id = req.params.id
    communities.find({ id }, (err, communities) => {
        if (communities.length >0){ 
            communities.deleteMany({ id }, function(err){
                if (err) {
                    res.status(500).send({ message: err.message })
            }
            res.status(200).send({ message : "Comunidade excluída com sucesso!"})
        })
    }   else {
            res.status(404).send({ message : "Comunidade não encontrada!"})
        }
    })
}

const putCommunity = (req, res) => {
    const id = req.params.id
    communities.updateMany({ id }, { $set : req.body }, { upsert : true }, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "Comunidade atualizada com sucesso!"})
        }
    })
}

module.exports = {
    getAll,
    getById,
    postCommunity,
    deleteCommunity,
    putCommunity
}