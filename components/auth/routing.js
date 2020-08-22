const express = require('express');
const Router = express.Router();
const authController = require('./controller');
const scrapper = require('../../scrapping/index');

const controllerResponse = new authController();


Router.post('/signup', async (req, res) => {
    const dataGather = await scrapper.run(req.body.username);
    const data = {
        ...dataGather,
        password: req.body.password
    }
    
    controllerResponse.createUserInFirebase(data)
        .then(data => {
            const successMessage = {
                userId: data,
                message: `user created with id: ${data}`
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


Router.post('/login', async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    controllerResponse.logIn(data)
        .then(data => {
            const successMessage = {
                userData: data,
                message: `user logged in`
            }
            res.cookie('user', data, {maxAge: 60 * 60 * 60 * 24});
            res.send(JSON.stringify(successMessage));
        })
        .catch(error => {
            console.error(error)
            const errorMessage = {
                error: true,
                message: error
            }
            res.send(JSON.stringify(errorMessage));
        })
})

module.exports = Router;