const express = require('express');
const Router = express.Router();
const listController = require('./controller');
const scrapper = require('../../scrapping/index');

const controllerResponse = new listController();


Router.post('/friends', async (req, res) => {
    const dataGather = await scrapper.run(req.body.username);
    const data = {
        ...dataGather,
        userId: req.body.userId
    };
    controllerResponse.addNewFriend(data)
        .then(dataRta => {
            const successMessage = {
                friend: dataRta,
                message: `friend added`
            }
            res.send(JSON.stringify(successMessage));
        })
        .catch(error => {
            console.error(error)
            const errorMessage = {
                error: true,
                message: error
            }
            res.send(JSON.stringify(errorMessage))
        })
})

Router.get('/friends/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    
    controllerResponse.getFriends(userId)
        .then(dataRta => {
            const successMessage = {
                friends: dataRta,
                message: `successfully get friends`
            }
            res.send(JSON.stringify(successMessage));
        })
        .catch(error => {
            console.error(error)
            const errorMessage = {
                error: true,
                message: error
            }
            res.send(JSON.stringify(errorMessage))
        })
})


module.exports = Router;