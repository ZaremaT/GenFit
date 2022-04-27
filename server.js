// getting the connection
require('./config/db.connection.js');

const express = require('express')
const methodOverride = require('method-override')
const app = express()
const PORT = 4000

// require our model

const productController = require('./controllers/products_controller')

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use('/products', productController)



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
