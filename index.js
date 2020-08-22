require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const firebase = require("firebase/app");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
require("firebase/firestore");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: "torre-test-a9bc0",
    storageBucket: "torre-test-a9bc0.appspot.com",
    messagingSenderId: "187802467011",
    appId: process.env.APP_ID,
    measurementId: "G-PYEJFZ15V3"
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
firebase.initializeApp(firebaseConfig);
router(app);

server.listen(process.env.PORT, () => {
    console.log(`app is running in: ${process.env.HOST}:${process.env.PORT}`);
});
