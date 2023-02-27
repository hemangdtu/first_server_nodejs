const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const productPage = fs.readFileSync("product.html", "utf-8");
const jsonData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = jsonData.products;

const express = require('express');

const server = express();

server.listen(8080, () => {
    console.log('Server started!');
});

// ----------------- MIDDLEWARES -----------------
server.use(express.json()); // BUILT-IN MIDDLEWARES

server.use((req, res, next) => {    // APPLICATION LEVEL MIDDLEWARE
    console.log(req.method, req.ip, req.hostname);
    next();
});

const basicAuth = (req, res, next) => { // ROUTERLEVEL MIDDLEWARE
    if(req.body.password == '123') {
        next();
    } else {
        res.sendStatus(401);
    }
};

// ERROR HANDLING MIDDLEWARE

// THIRD-PARTY MIDDLEWARE

// ----------------- APIs - ENDPOINTS - ROUTES -----------------
server.get('/', (req, res)=>{
    //  res.send('Welcome to the homepage.');
     res.json({type:'GET'});
 });

 server.post('/', basicAuth, (req, res) => {
    res.json({type: 'POST'});
 });

 server.delete('/', (req, res) => {
    res.json({type: 'DELETE'});
 });

 server.put('/', (req, res) => {
    res.json({type: 'PUT'});
 });

 server.patch('/', (req, res) => {
    res.json({type: 'PATCH'});
 });
