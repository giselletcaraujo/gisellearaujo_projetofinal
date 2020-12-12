const communities = require("../models/communities.json")
const fs = require("fs")

const getAllCommunities = (req, res) => {
    console.log("Minha query string:")
    console.log(req.query)
    const genre = req.query.genre 
    if (genre) { 
        const communitiesByGenre = communities.filter(community => community.genre.includes(genre)) 
        res.status(200).send(communitiesByGenre) 
    } else { 
        res.status(200).send(communities)
    } 
}

const createCommunity = (req, res) => {
    const { id, name, genre, city, numStudents, numArtifact, received } = req.body
    communities.push({ id, name, genre, city, numStudents, numArtifact, received }) 
    fs.writeFile("./src/models/communities.json", JSON.stringify(communities), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err }) 
        } else {
            console.log("Comunidade cadastrada com sucesso!")
            const communityFound = communities.find(community => community.id == id) 
            res.status(200).send(communityFound)
        }
    })
}

const getCommunity = (req, res) => {
    const communityId = req.params.id
    const communityFound = communities.find(community => community.id == communityId)

    if (communityFound) {
        res.status(200).send(communityFound)
    } else {
        res.status(404).send({ message: "Comunidade não encontrada" })
    }
}

const updateCommunity = (req, res) => {
    const communityId = req.params.id
    const communityToUpdate = req.body

    const communityFound = communities.find(community => community.id == communityId) 
    const communityIndex = communities.indexOf(communityFound) 

if (communityIndex >= 0) { 
        communities.splice(communityIndex, 1, communityToUpdate) 
        fs.writeFile("./src/models/communities.json", JSON.stringify(communities), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err }) 
            } else {
                console.log("Cadastro da comunidade atualizado com sucesso!")
                const communityUpdated = communities.find(community => community.id == communityId)
                res.status(200).send(communityUpdated)
            }
        })
    } else {
        res.status(404).send({ message: "Comunidade não encontrada para atualização!" })
    }
}

const updateReceivedStatus = (req, res) => {
    try {
        const communityId = req.params.id
        const newReceived = req.body.received 

        const communityToUpdate = communities.find(community => community.id == communityId) 
        const communityIndex = communities.indexOf(communityToUpdate)

        if (communityIndex >= 0) {
            communityToUpdate.received = newReceived
            communities.splice(communityIndex, 1, communityToUpdate) 
            fs.writeFile("./src/models/communities.json", JSON.stringify(communities), 'utf8', function (err) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    console.log("Cadastro da comunidade atualizado com sucesso!")
                    const communityUpdated = communities.find(community => community.id == communityId)
                    res.status(200).send(communityUpdated)
                }
            })
        } else {
            res.status(400).send({ message: "Comunidade não encontrada para atualização!" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Erro na API")
    }

}

const deleteCommunity = (req, res) => {
    try {
        const communityId = req.params.id
        const communitiesFound = communities.filter(community => community.id == communityId) 

        if (communitiesFound && communitiesFound.length > 0) {
            communitiesFound.forEach(community => { 
                const communityIndex = communities.indexOf(community)
                communities.splice(communityIndex, 1)
            })

            fs.writeFile("./src/models/communities.json", JSON.stringify(communities), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Cadastro de Comunidade deletado com sucesso!")
                    res.sendStatus(204) 
                }
            })

        } else {
            res.status(400).send({ message: "Cadastro de Comunidade não encontrado para deletar" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Erro ao deletar cadastro de Comunidade" })
    }
}

module.exports = {
    getAllCommunities,
    createCommunity,
    getCommunity,
    updateCommunity,
    updateReceivedStatus,
    deleteCommunity
}