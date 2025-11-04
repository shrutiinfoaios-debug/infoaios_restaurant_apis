// server.js
require('dotenv').config();
require('./src/db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
const jwtSecretToken = process.env.JWT_SECRET_ACCESS_TOKEN;
const usersRoute = require('./src/routes/usersRoute');
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], jwtSecretToken, function(err, decode) {
        if (err) req.user = undefined;
            req.user = decode;
            next();
        });
        } else {
            req.user = undefined;
            next();
        }
    }); 
    app.use('/',usersRoute);
    app.use(function(req, res) {
        res.status(404).send({ url: req.originalUrl + ' not found' })
        res.end();
    });
    app.listen(port);
    
    console.log(' RESTful API server started on: ' + port);
    module.exports = app;
