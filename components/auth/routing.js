const express = require('express');
const Router = express.Router();
const authController = require('./controller');
const scrapper = require('../../scrapping/index');
const responses = require('../../libs/responses');

const controllerResponse = new authController();


Router.post('/signup', async (req, res) => {
    try {
        const dataGather = await scrapper.run(req.body.username);
        const data = {
            ...dataGather,
        }
        let cookie = req.cookies.userInfo;
        if (!cookie) {
            const dataRta = await controllerResponse.createUserInFirebase(data)
            const successMessage = {
                userId: dataRta,
                message: `user created with id: ${dataRta}`,
                userData: data 
            }
            res.send(JSON.stringify(successMessage));
        } else {
            const dataRta = await controllerResponse.getUserInfo(cookie)
            res.send(dataRta);
        }
    } catch (error) {
        const errorMessage = responses(error);
        res.status(500).send(JSON.stringify(errorMessage));
    }
})


Router.get('/userinfo', async (req, res) => {
    let cookie = req.headers.cookie;
    try {
        const dataRta = await controllerResponse.getUserInfo(cookie)
        res.send(dataRta);
    } catch(error) {
        const errorMessage = responses(error);
        res.status(500).send(JSON.stringify(errorMessage));
    }
})

module.exports = Router;