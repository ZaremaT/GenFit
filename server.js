// getting the connection
require('./config/db.connection.js');

const express = require('express')
const methodOverride = require('method-override')
const app = express()
const PORT = 4000

// require our model
const Product = require('./models/Product.js');
const productController = require('./controllers/products_controller')

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('index.ejs', {allProducts: productController.allProducts});
});

app.get('/product/:id', (req,res) => {
    // to show a specific product
});


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
