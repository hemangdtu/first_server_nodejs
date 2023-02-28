const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const productPage = fs.readFileSync("product.html", "utf-8");
const jsonData = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const express = require('express');

const mongoose = require('mongoose');

const server = express();

const products = jsonData.products;

server.listen(8080, () => {
    console.log('Server started!');
});

server.use(express.json());

// REST APIs

// Create POST /products
server.post('/products', (req, res) => {
    console.log(req.body);
    products.push(req.body);
    res.status(201).json(req.body)
});

// Read GET /products
server.get('/products', (req, res) => {
    res.status(200).json(products);
});

// Read GET /products/:id
server.get('/products/:id', (req, res) => {
    const productId = +req.params.id;
    const productDetails = products.find(p => p.id === productId);
    res.status(200).json(productDetails);
});

// Update PUT /products/:id
server.put('products/:id', (req, res) => {
    const productId = +req.params.id;
    const productIndex = products.findIndex(p => p.id === productId);
    products.splice(productIndex, 1, {...req.body, id: productId});
    res.status(201).json({message: "Data updated successfully!"});
});

// Update PATCH /products/:id
server.patch('/products/:id', (req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex(p => p.id = productId);
    products.splice(productIndex, 1, {...products[productIndex], ...req.body});
    res.status(201).json({message: "Data updated successfully!"});
});

// Delete DELETE /products/:id
server.delete('/products/:id', (req, res) => {
    const productId = +req.params.id;
    const productIndex = products.findIndex(p => p.id === productId);
    products.splice(productIndex, 1);
    res.status(200).json({message: "Data deleted successfully!"});
});
