// getting the connection
require('./config/db.connection.js');

const express = require('express')
const app = express()
const PORT = 4000

// require our model
const Product = require('./models/product.js');

app.set('view engine', 'ejs')
app.use(express.static("public"))

app.get('/', (req, res) => {
    const SpiderManData = {spiderMan}
    res.render('index.ejs', {SpiderManData: SpiderManData});
});

app.post('/product/new', (req,res) => {
    Product.create([
        {
            title: title,
            author: author},
        ],
        (err, createdArticle) => {
            if (err) {
            // if there's an error
            console.log(err);
        } else {
            // print the created article
            console.log(createdArticle)
        }
    })
});

app.listen(PORT, () => console.log( `Listening on ${PORT} `))