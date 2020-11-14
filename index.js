require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const firebase = require("firebase/app");
var cookieParser = require('cookie-parser');
require("firebase/firestore");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
const firebaseConfig = {
    apiKey: "AIzaSyCSRERxX3oBBVaU4FMLkm7Q1fQxFiub_4o",
    authDomain: "torre-test-a9bc0.firebaseapp.com",
    databaseURL: "https://torre-test-a9bc0.firebaseio.com",
    projectId: "torre-test-a9bc0",
    storageBucket: "torre-test-a9bc0.appspot.com",
    messagingSenderId: "187802467011",
    appId: "1:187802467011:web:9b5fe48c09440ae1d4c076",
    measurementId: "G-PYEJFZ15V3"
}

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
firebase.initializeApp(firebaseConfig);
router(app);

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'http://localhost'
server.listen(port, () => {
    console.log(`app is running in: ${host}:${port}`);
});
