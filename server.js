// getting the connection
require('./config/db.connection.js');

const express = require('express')
const methodOverride = require('method-override')
const app = express()
const PORT = 4000

// require our model

const productController = require('./controllers/products_controller')

// "show" route for displaying individual products
router.get('/:id/', async (req, res, next) => {
    try {
      const foundProduct = await db.Product.findById(req.params.id)
      console.log(foundProduct);
      const context = { oneProduct: foundProduct }
      res.render('show.ejs, context');
    } catch (error) {
     console.log(error);
     req.error = error;
     return next();
    }
 })
 

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use('/products', productController)



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
