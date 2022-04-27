// getting the connection
require('./config/db.connection.js');

const express = require('express')
const app = express()
const PORT = 4000

// require our model
const Product = require('./models/product.js');
const productController = require('./controllers/products_controller')

app.set('view engine', 'ejs')
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('index.ejs', {allProducts: productController.allProducts});
});

app.get('/product/:id', (req,res) => {
    // to show a specific product
});

app.get('/profile/:id', (req,res) => {
    // to show a specific product
});

app.listen(PORT, () => console.log( `Listening on ${PORT} `))