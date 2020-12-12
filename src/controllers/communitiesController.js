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

const getByGenre = (req, res) => {
    const param = req.query
    communities.find(param, function (err, communities) {
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
    communities.deleteMany({ id }, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "Comunidade excluída com sucesso!"})
        }
    })
}

const deleteCommunitiesByGenre = (req, res) => {
    const params = req.query
    communities.deleteMany(params, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "Comunidades excluídas com sucesso!"})
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
    getByGenre,
    getById,
    postCommunity,
    deleteCommunity,
    deleteCommunitiesByGenre,
    putCommunity
}