const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const productPage = fs.readFileSync("product.html", "utf-8");
const jsonData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = jsonData.products;

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/product')) {
        const id = req.url.split('/')[2];
        const productDetails = products.find(p => p.id === (+id));
        res.setHeader('Content-Type', 'text/html');
        let modifiedProductPage = productPage.replace('**title**', productDetails.title).replace('**url**', productDetails.thumbnail).replace('**price**', productDetails.price).replace('**rating**', productDetails.rating);
        res.end(modifiedProductPage);
        return;
    }

    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html');
            res.end(index);
            break;
        // case '/product':
        //     res.setHeader('Content-Type', 'text/html');
        //     let modifiedProductPage = productPage.replace('**title**', product.title).replace('**url**', product.thumbnail).replace('**price**', product.price).replace('**rating**', product.rating);
        //     res.end(modifiedProductPage);
        //     break;
        case '/api':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(jsonData));
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<H1>PAGE NOT FOUND!</H1>')
    }
    console.log("Server started!");
});

server.listen(8080);

